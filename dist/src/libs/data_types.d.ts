/// <reference types="qs" />
import { Array, Boolean, Function, Partial, Record, String } from 'runtypes';
import express from 'express';
import Prometheus from 'prom-client';
export declare const PromClientRegistry: import("runtypes").Constraint<import("runtypes").Unknown, Prometheus.Registry, unknown>;
export declare const PromClientDefaultMetricsCollectorConfiguration: import("runtypes").Constraint<import("runtypes").Unknown, Prometheus.DefaultMetricsCollectorConfiguration, unknown>;
export declare const CompleteOptions: Record<{
    collectDefaultMetrics: import("runtypes").Union<[Boolean, import("runtypes").Constraint<import("runtypes").Unknown, Prometheus.DefaultMetricsCollectorConfiguration, unknown>]>;
    collectGCMetrics: Boolean;
    exclude: Function;
    excludePaths: Array<String, false>;
    url: String;
}, false>;
export declare const ExpressRequest: import("runtypes").Constraint<import("runtypes").Unknown, express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, globalThis.Record<string, any>>, unknown>;
export declare const Options: Partial<{
    collectDefaultMetrics: import("runtypes").Union<[Boolean, import("runtypes").Constraint<import("runtypes").Unknown, Prometheus.DefaultMetricsCollectorConfiguration, unknown>]>;
    collectGCMetrics: Boolean;
    exclude: Function;
    excludePaths: Array<String, false>;
    url: String;
}, false>;
//# sourceMappingURL=data_types.d.ts.map