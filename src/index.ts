'use strict'
import express from 'express'
import onFinished from 'on-finished'
import Prometheus from 'prom-client'
import {
  Boolean,
  Contract,
  Static
} from 'runtypes'

import collectGarbageCollectionMetrics from './libs/collectGarbageCollectionMetrics'
import {
  CompleteOptions,
  ExpressRequest,
  Options
} from './libs/dataTypes'
import {
  getURLRegExp,
  isPathExcluded
} from './libs/utils'

const defaultOptions = Object.freeze({
  collectDefaultMetrics: true,
  collectGCMetrics: true,
  exclude: (req: express.Request) => false,
  excludePaths: [],
  url: '/metrics'
})

const HTTPDuration = new Prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path', 'status']
})

const HTTPThroughput = new Prometheus.Counter({
  name: 'http_requests_total',
  help: 'HTTP request throughput',
  labelNames: ['method', 'path', 'status']
})

const instrument = (options: Static<typeof Options> = {}): express.RequestHandler => {
  const opts = CompleteOptions.check(Object.assign({}, defaultOptions, options))
  if (opts.collectDefaultMetrics) {
    const defaultMetricsOptions = Object.assign({}, opts.collectDefaultMetrics)
    Prometheus.collectDefaultMetrics(defaultMetricsOptions as Prometheus.DefaultMetricsCollectorConfiguration)
  }

  if (opts.collectGCMetrics) {
    collectGarbageCollectionMetrics(Prometheus.register)
  }

  if (opts.exclude) {
    opts.exclude = Contract(
      ExpressRequest,
      Boolean
    ).enforce(opts.exclude)
  }

  const metricsPathRegex = getURLRegExp(opts.url)
  return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (metricsPathRegex.test(req.path)) {
      Prometheus.register.metrics()
        .then(metrics => {
          res.header('Content-Type', 'text/plain; charset=utf-8')
          res.status(200).send(metrics)
        })
        .catch(next)

      return
    }

    try {
      if (opts.exclude(req)) {
        return next()
      }
    } catch (e) {
      return next(e)
    }

    if (isPathExcluded(opts.excludePaths, req.path)) {
      return next()
    }

    const endTimer = HTTPDuration.startTimer()
    onFinished(res, () => {
      const labels = {
        method: req.method,
        path: req.path,
        status: res.statusCode
      }

      HTTPThroughput.labels(labels).inc()
      endTimer(labels)
    })

    next()
  }
}

export default instrument
