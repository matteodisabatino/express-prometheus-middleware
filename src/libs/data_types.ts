import {
  Array,
  Boolean,
  Function,
  Guard,
  Number,
  Partial,
  Record,
  String
} from 'runtypes'
import express from 'express'
import Prometheus from 'prom-client'

export const PromClientRegistry = Guard((obj: unknown): obj is Prometheus.Registry => obj instanceof Prometheus.Registry)

export const PromClientDefaultMetricsCollectorConfiguration = Partial({
  timeout: Number, // prom-client@^11
  register: PromClientRegistry, // prom-client@^11, prom-client@^12, prom-client@^13, prom-client@^14
  prefix: String, // prom-client@^12, prom-client@^13, prom-client@^14
  gcDurationBuckets: Array(Number), // prom-client@^12, prom-client@^13, prom-client@^14
  eventLoopMonitoringPrecision: Number, // prom-client@^12, prom-client@^13, prom-client@^14
  labels: Guard((obj: unknown): obj is globalThis.Record<string, unknown> => Object.prototype.toString.call(obj) === '[object Object]')// prom-client@^13, prom-client@^14
})

export const CompleteOptions = Record({
  collectDefaultMetrics: Boolean.Or(PromClientDefaultMetricsCollectorConfiguration),
  collectGCMetrics: Boolean,
  exclude: Function,
  excludePaths: Array(String),
  url: String
})

export const ExpressRequest = Guard((obj: unknown): obj is express.Request => Object.prototype.isPrototypeOf.call(express.request, obj as object))

export const Options = Partial({
  collectDefaultMetrics: Boolean.Or(PromClientDefaultMetricsCollectorConfiguration),
  collectGCMetrics: Boolean,
  exclude: Function,
  excludePaths: Array(String),
  url: String
})
