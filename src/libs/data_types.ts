'use strict'
import {
  Array,
  Boolean,
  Function,
  Guard,
  Number,
  Optional,
  Partial,
  Record,
  String
} from 'runtypes'
import express from 'express'
import Prometheus from 'prom-client'

export const PromClientRegistry = Guard((obj: any): obj is Prometheus.Registry => obj instanceof Prometheus.Registry)

export const PromClientDefaultMetricsCollectorConfiguration = Guard((obj: any): obj is Prometheus.DefaultMetricsCollectorConfiguration => {
  try {
    // prom-client@^11
    Optional(Number).check(obj.timeout)

    // prom-client@^11, prom-client@^12, prom-client@^13, prom-client@^14
    Optional(PromClientRegistry).check(obj.register)

    // prom-client@^12, prom-client@^13, prom-client@^14
    Optional(String).check(obj.prefix)

    // prom-client@^12, prom-client@^13, prom-client@^14
    Optional(Array(Number)).check(obj.gcDurationBuckets)

    // prom-client@^12, prom-client@^13, prom-client@^14
    Optional(Number).check(obj.eventLoopMonitoringPrecision)

    // prom-client@^13, prom-client@^14
    Optional(Guard((obj: any): obj is Object => Object.prototype.toString.call(obj) === '[object Object]')).check(obj.labels)

    return true
  } catch {
    return false
  }
})

export const CompleteOptions = Record({
  collectDefaultMetrics: Boolean.Or(PromClientDefaultMetricsCollectorConfiguration),
  collectGCMetrics: Boolean,
  exclude: Function,
  excludePaths: Array(String),
  url: String
})

export const ExpressRequest = Guard((obj: any): obj is express.Request => Object.prototype.isPrototypeOf.call(express.request, obj))

export const Options = Partial({
  collectDefaultMetrics: Boolean.Or(PromClientDefaultMetricsCollectorConfiguration),
  collectGCMetrics: Boolean,
  exclude: Function,
  excludePaths: Array(String),
  url: String
})
