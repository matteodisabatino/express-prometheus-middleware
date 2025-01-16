import {
  Boolean,
  Contract,
  type Static
} from 'runtypes'
import type express from 'express'
import onFinished from 'on-finished'
import Prometheus from 'prom-client'

import {
  CompleteOptions,
  ExpressRequest,
  type Options
} from './libs/data_types'
import { getUrlRegExp, isPathExcluded } from './libs/utils'

import manifest from '../package.json'

const privateVariablesInstanceMap = new WeakMap()
class ExpressPrometheusMiddlewarePrivateVariables {
  readonly collectDefaultMetrics: boolean | Prometheus.DefaultMetricsCollectorConfiguration<Prometheus.RegistryContentType>
  readonly exclude: (req: express.Request) => boolean
  readonly excludePaths: string[]
  readonly url: string

  constructor (options: Static<typeof Options> = {}) {
    const defaultOptions = Object.freeze({
      collectDefaultMetrics: true,
      exclude: (req: express.Request) => false,
      excludePaths: [],
      url: '/metrics'
    })

    const opts = CompleteOptions.check(Object.assign({}, defaultOptions, options))
    this.collectDefaultMetrics = opts.collectDefaultMetrics
    this.exclude = opts.exclude
    this.excludePaths = opts.excludePaths
    this.url = opts.url.startsWith('/') ? opts.url : `/${opts.url}`
  }
}

export class ExpressPrometheusMiddleware {
  constructor (options: Static<typeof Options> = {}) {
    privateVariablesInstanceMap.set(this, new ExpressPrometheusMiddlewarePrivateVariables(options))

    if (this.collectDefaultMetrics) {
      const defaultMetricsOptions = Object.assign({}, this.collectDefaultMetrics)
      Prometheus.collectDefaultMetrics(defaultMetricsOptions as Prometheus.DefaultMetricsCollectorConfiguration<Prometheus.RegistryContentType>)
    }
  }

  static get version (): string {
    return manifest.version
  }

  get collectDefaultMetrics (): boolean | Prometheus.DefaultMetricsCollectorConfiguration<Prometheus.RegistryContentType> {
    return privateVariablesInstanceMap.get(this).collectDefaultMetrics
  }

  get exclude (): (req: express.Request) => boolean {
    return privateVariablesInstanceMap.get(this).exclude
  }

  get excludePaths (): string[] {
    return privateVariablesInstanceMap.get(this).excludePaths
  }

  get handler (): express.RequestHandler {
    const urlRegex = getUrlRegExp(this.url)
    const contractExclude = Contract(
      ExpressRequest,
      Boolean
    ).enforce(this.exclude)

    const labelNames = ['method', 'path', 'status']
    const HTTPDuration = new Prometheus.Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames
    })

    const HTTPThroughput = new Prometheus.Counter({
      name: 'http_requests_total',
      help: 'HTTP request throughput',
      labelNames
    })

    return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
      try {
        if (urlRegex.test(req.path)) {
          const promiseMetrics = new Promise((resolve, reject) => {
            try {
              const maybePromise = Prometheus.register.metrics()
              if (maybePromise instanceof Promise) {
                maybePromise
                  .then(resolve)
                  .catch(reject)
              } else {
                resolve(maybePromise)
              }
            } catch (e) {
              reject(e)
            }
          })

          promiseMetrics
            .then(metrics => {
              res.header('Content-Type', Prometheus.register.contentType)
              res.status(200).send(metrics)
            })
            .catch(next)

          return
        }

        if (contractExclude(req)) {
          next()
          return
        }

        if (isPathExcluded(this.excludePaths, req.path)) {
          next()
          return
        }

        const endTimer = HTTPDuration.startTimer()
        onFinished(res, () => {
          const labels = {
            method: req.method,
            path: req.route ? req.baseUrl + String(req.route.path) : req.path,
            status: res.statusCode
          }

          HTTPThroughput.inc(labels)
          endTimer(labels)
        })

        next()
      } catch (e) {
        next(e)
      }
    }
  }

  get url (): string {
    return privateVariablesInstanceMap.get(this).url
  }
}
