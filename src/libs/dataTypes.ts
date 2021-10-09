'use strict'
import express from 'express'
import {
  Array,
  Boolean,
  Function,
  Partial,
  Record,
  String,
  Unknown
} from 'runtypes'

export const CompleteOptions = Record({
  collectDefaultMetrics: Boolean.Or(
    Unknown.withGuard((obj: any): obj is Object => Object.prototype.toString.call(obj) === '[object Object]')
  ),
  collectGCMetrics: Boolean,
  exclude: Function,
  excludePaths: Array(String),
  url: String
})

export const ExpressRequest = Unknown.withGuard((obj: any): obj is express.Request =>
  typeof obj.get === 'function' ||
  typeof obj.header === 'function'
)

export const Options = Partial({
  collectDefaultMetrics: Boolean.Or(
    Unknown.withGuard((obj: any): obj is Object => Object.prototype.toString.call(obj) === '[object Object]')
  ),
  collectGCMetrics: Boolean,
  exclude: Function,
  excludePaths: Array(String),
  url: String
})
