import { Array, Boolean, Function, Number, Object, String, Union, Unknown } from 'runtypes';
import express from 'express';
import Prometheus from 'prom-client';
export declare const PromClientRegistry: import("runtypes").Constraint<Unknown, Prometheus.Registry<"text/plain; version=0.0.4; charset=utf-8">>;
export declare const PromClientDefaultMetricsCollectorConfiguration: Object<{
    timeout: import("runtypes").Optional<Union<[Number, import("runtypes").Literal<undefined>]>, never>;
    register: import("runtypes").Optional<Union<[import("runtypes").Constraint<Unknown, Prometheus.Registry<"text/plain; version=0.0.4; charset=utf-8">>, import("runtypes").Literal<undefined>]>, never>;
    prefix: import("runtypes").Optional<Union<[String, import("runtypes").Literal<undefined>]>, never>;
    gcDurationBuckets: import("runtypes").Optional<Union<[Array<Number>, import("runtypes").Literal<undefined>]>, never>;
    eventLoopMonitoringPrecision: import("runtypes").Optional<Union<[Number, import("runtypes").Literal<undefined>]>, never>;
    labels: import("runtypes").Optional<Union<[import("runtypes").Constraint<Unknown, Record<string, unknown>>, import("runtypes").Literal<undefined>]>, never>;
}>;
export declare const CompleteOptions: Object<{
    collectDefaultMetrics: Union<[Boolean, Object<{
        timeout: import("runtypes").Optional<Union<[Number, import("runtypes").Literal<undefined>]>, never>;
        register: import("runtypes").Optional<Union<[import("runtypes").Constraint<Unknown, Prometheus.Registry<"text/plain; version=0.0.4; charset=utf-8">>, import("runtypes").Literal<undefined>]>, never>;
        prefix: import("runtypes").Optional<Union<[String, import("runtypes").Literal<undefined>]>, never>;
        gcDurationBuckets: import("runtypes").Optional<Union<[Array<Number>, import("runtypes").Literal<undefined>]>, never>;
        eventLoopMonitoringPrecision: import("runtypes").Optional<Union<[Number, import("runtypes").Literal<undefined>]>, never>;
        labels: import("runtypes").Optional<Union<[import("runtypes").Constraint<Unknown, Record<string, unknown>>, import("runtypes").Literal<undefined>]>, never>;
    }>]>;
    exclude: Function;
    excludePaths: Array<String>;
    url: String;
}>;
export declare const ExpressRequest: import("runtypes").Constraint<Unknown, express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>>;
export declare const Options: Object<{
    collectDefaultMetrics: import("runtypes").Optional<Union<[Union<[Boolean, Object<{
        timeout: import("runtypes").Optional<Union<[Number, import("runtypes").Literal<undefined>]>, never>;
        register: import("runtypes").Optional<Union<[import("runtypes").Constraint<Unknown, Prometheus.Registry<"text/plain; version=0.0.4; charset=utf-8">>, import("runtypes").Literal<undefined>]>, never>;
        prefix: import("runtypes").Optional<Union<[String, import("runtypes").Literal<undefined>]>, never>;
        gcDurationBuckets: import("runtypes").Optional<Union<[Array<Number>, import("runtypes").Literal<undefined>]>, never>;
        eventLoopMonitoringPrecision: import("runtypes").Optional<Union<[Number, import("runtypes").Literal<undefined>]>, never>;
        labels: import("runtypes").Optional<Union<[import("runtypes").Constraint<Unknown, Record<string, unknown>>, import("runtypes").Literal<undefined>]>, never>;
    }>]>, import("runtypes").Literal<undefined>]>, never>;
    exclude: import("runtypes").Optional<Union<[Function, import("runtypes").Literal<undefined>]>, never>;
    excludePaths: import("runtypes").Optional<Union<[Array<String>, import("runtypes").Literal<undefined>]>, never>;
    url: import("runtypes").Optional<Union<[String, import("runtypes").Literal<undefined>]>, never>;
}>;
//# sourceMappingURL=data_types.d.ts.map