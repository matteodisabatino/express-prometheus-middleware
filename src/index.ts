'use strict'
import {
  Boolean,
  Contract,
  type Static
} from 'runtypes'
import type express from 'express'
import gcInfo from '@matteodisabatino/gc_info'
import onFinished from 'on-finished'
import Prometheus from 'prom-client'
import semver from 'semver'

import {
  CompleteOptions,
  ExpressRequest,
  type Options
} from './libs/data_types'
import { getUrlRegExp, isPathExcluded } from './libs/utils'

import manifest from '../package.json'

const privateVariablesInstanceMap = new WeakMap()
const collectGarbageCollectionMetrics = (): void => {
  const labelNames = ['gctype']
  const countMetric = new Prometheus.Counter({
    name: 'nodejs_gc_runs_total',
    help: 'Total number of garbage collections',
    labelNames
  })

  const durationMetric = new Prometheus.Gauge({
    name: 'nodejs_gc_duration',
    help: 'Time the GC has been active',
    labelNames
  })

  const memoryMetrics: Record<string, Prometheus.Gauge<string>> = {
    totalHeapSize: new Prometheus.Gauge({
      name: 'nodejs_gc_total_heap_size',
      help: 'Number of bytes V8 has allocated for the heap',
      labelNames
    }),
    totalHeapSizeExecutable: new Prometheus.Gauge({
      name: 'nodejs_gc_total_heap_size_executable',
      help: 'Number of bytes for compiled bytecode and JITed code',
      labelNames
    }),
    usedHeapSize: new Prometheus.Gauge({
      name: 'nodejs_gc_used_heap_size',
      help: 'Number of bytes in use by application data',
      labelNames
    }),
    heapSizeLimit: new Prometheus.Gauge({
      name: 'nodejs_gc_heap_size_limit',
      help: 'The absolute limit the heap cannot exceed',
      labelNames
    })
  }

  if (semver.gte(process.version, '0.12.0')) {
    memoryMetrics.totalPhysicalSize = new Prometheus.Gauge({
      name: 'nodejs_gc_total_physical_size',
      help: 'Committed size',
      labelNames
    })
  }

  if (semver.gte(process.version, '4.0.0')) {
    memoryMetrics.totalAvailableSize = new Prometheus.Gauge({
      name: 'nodejs_gc_total_available_size',
      help: 'Available heap size',
      labelNames
    })
  }

  if (semver.gte(process.version, '7.0.0')) {
    memoryMetrics.mallocedMemory = new Prometheus.Gauge({
      name: 'nodejs_gc_malloced_memory',
      help: 'Current amount of memory, obtained via malloc',
      labelNames
    })

    memoryMetrics.peakMallocedMemory = new Prometheus.Gauge({
      name: 'nodejs_gc_peak_malloced_memory',
      help: 'Peak amount of memory, obtained via malloc',
      labelNames
    })
  }

  if (semver.gte(process.version, '10.0.0')) {
    memoryMetrics.numberOfNativeContexts = new Prometheus.Gauge({
      name: 'nodejs_gc_number_of_native_contexts',
      help: 'Number of the top-level contexts currently active',
      labelNames
    })

    memoryMetrics.numberOfDetachedContexts = new Prometheus.Gauge({
      name: 'nodejs_gc_number_of_detached_contexts',
      help: 'Number of contexts that were detached and not yet garbage collected',
      labelNames
    })
  }

  if (semver.gte(process.version, '12.0.0')) {
    memoryMetrics.externalMemory = new Prometheus.Gauge({
      name: 'nodejs_gc_external_memory',
      help: "Number of bytes of memory allocated outside of v8's heap",
      labelNames
    })
  }

  if (semver.gte(process.version, '14.0.0')) {
    memoryMetrics.totalGlobalHandlesSize = new Prometheus.Gauge({
      name: 'nodejs_gc_total_global_handles_size',
      help: 'Size of all global handles in the heap',
      labelNames
    })

    memoryMetrics.usedGlobalHandlesSize = new Prometheus.Gauge({
      name: 'nodejs_gc_used_global_handles_size',
      help: 'Size of all allocated/used global handles in the heap',
      labelNames
    })
  }

  gcInfo.on('data', (info: gcInfo.GcInfo) => {
    const gctype: string = gcInfo.GcType[info.gctype] ?? 'Unknown'
    countMetric.inc({ gctype })
    durationMetric.set({ gctype }, info.duration)

    memoryMetrics.totalHeapSize.set({ gctype }, info.post.totalHeapSize)
    memoryMetrics.totalHeapSizeExecutable.set({ gctype }, info.post.totalHeapSizeExecutable)
    memoryMetrics.usedHeapSize.set({ gctype }, info.post.usedHeapSize)
    memoryMetrics.heapSizeLimit.set({ gctype }, info.post.heapSizeLimit)
    if (semver.gte(process.version, '0.12.0')) {
      memoryMetrics.totalPhysicalSize.set({ gctype }, info.post.totalPhysicalSize!)
    }

    if (semver.gte(process.version, '4.0.0')) {
      memoryMetrics.totalAvailableSize.set({ gctype }, info.post.totalAvailableSize!)
    }

    if (semver.gte(process.version, '7.0.0')) {
      memoryMetrics.mallocedMemory.set({ gctype }, info.post.mallocedMemory!)
      memoryMetrics.peakMallocedMemory.set({ gctype }, info.post.peakMallocedMemory!)
    }

    if (semver.gte(process.version, '10.0.0')) {
      memoryMetrics.numberOfNativeContexts.set({ gctype }, info.post.numberOfNativeContexts!)
      memoryMetrics.numberOfDetachedContexts.set({ gctype }, info.post.numberOfDetachedContexts!)
    }

    if (semver.gte(process.version, '12.0.0')) {
      memoryMetrics.externalMemory.set({ gctype }, info.post.externalMemory!)
    }

    if (semver.gte(process.version, '14.0.0')) {
      memoryMetrics.totalGlobalHandlesSize.set({ gctype }, info.post.totalGlobalHandlesSize!)
      memoryMetrics.usedGlobalHandlesSize.set({ gctype }, info.post.usedGlobalHandlesSize!)
    }
  })
}

class ExpressPrometheusMiddlewarePrivateVariables {
  readonly collectDefaultMetrics: boolean | Prometheus.DefaultMetricsCollectorConfiguration<Prometheus.RegistryContentType>
  readonly collectGCMetrics: boolean
  readonly exclude: (req: express.Request) => boolean
  readonly excludePaths: string[]
  readonly url: string

  constructor (options: Static<typeof Options> = {}) {
    const defaultOptions = Object.freeze({
      collectDefaultMetrics: true,
      collectGCMetrics: true,
      exclude: (req: express.Request) => false,
      excludePaths: [],
      url: '/metrics'
    })

    const opts = CompleteOptions.check(Object.assign({}, defaultOptions, options))
    this.collectDefaultMetrics = opts.collectDefaultMetrics
    this.collectGCMetrics = opts.collectGCMetrics
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

    if (this.collectGCMetrics) {
      collectGarbageCollectionMetrics()
    }
  }

  static get version (): string {
    return manifest.version
  }

  get collectDefaultMetrics (): boolean | Prometheus.DefaultMetricsCollectorConfiguration<Prometheus.RegistryContentType> {
    return privateVariablesInstanceMap.get(this).collectDefaultMetrics
  }

  get collectGCMetrics (): boolean {
    return privateVariablesInstanceMap.get(this).collectGCMetrics
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
