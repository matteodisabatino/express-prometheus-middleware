import {
  Array,
  Boolean,
  Function,
  Number,
  Object,
  String,
  Union,
  Unknown
} from 'runtypes'
import express from 'express'
import Prometheus from 'prom-client'

export const PromClientRegistry = Unknown.withGuard((obj: unknown): obj is Prometheus.Registry => obj instanceof Prometheus.Registry)

export const PromClientDefaultMetricsCollectorConfiguration = Object({
  timeout: Number.undefinedable().optional(), // prom-client@^11
  register: PromClientRegistry.undefinedable().optional(), // prom-client@^11, prom-client@^12, prom-client@^13, prom-client@^14
  prefix: String.undefinedable().optional(), // prom-client@^12, prom-client@^13, prom-client@^14
  gcDurationBuckets: Array(Number).undefinedable().optional(), // prom-client@^12, prom-client@^13, prom-client@^14
  eventLoopMonitoringPrecision: Number.undefinedable().optional(), // prom-client@^12, prom-client@^13, prom-client@^14
  labels: Unknown.withGuard((obj: unknown): obj is Record<string, unknown> => globalThis.Object.prototype.toString.call(obj) === '[object Object]').undefinedable().optional() // prom-client@^13, prom-client@^14
})

export const CompleteOptions = Object({
  collectDefaultMetrics: Union(Boolean, PromClientDefaultMetricsCollectorConfiguration),
  exclude: Function,
  excludePaths: Array(String),
  url: String
})

export const ExpressRequest = Unknown.withGuard((obj: unknown): obj is express.Request => globalThis.Object.prototype.isPrototypeOf.call(express.request, obj as object))

export const Options = Object({
  collectDefaultMetrics: Union(Boolean, PromClientDefaultMetricsCollectorConfiguration).undefinedable().optional(),
  exclude: Function.undefinedable().optional(),
  excludePaths: Array(String).undefinedable().optional(),
  url: String.undefinedable().optional()
})
