/// <reference types="qs" />
import express from 'express';
import { Array, Boolean, Function, Partial, Record, String, Unknown } from 'runtypes';
export declare const CompleteOptions: Record<{
    collectDefaultMetrics: import("runtypes").Union<[Boolean, import("runtypes").Constraint<Unknown, Object, unknown>]>;
    collectGCMetrics: Boolean;
    exclude: Function;
    excludePaths: Array<String, false>;
    url: String;
}, false>;
export declare const ExpressRequest: import("runtypes").Constraint<Unknown, express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, globalThis.Record<string, any>>, unknown>;
export declare const Options: Partial<{
    collectDefaultMetrics: import("runtypes").Union<[Boolean, import("runtypes").Constraint<Unknown, Object, unknown>]>;
    collectGCMetrics: Boolean;
    exclude: Function;
    excludePaths: Array<String, false>;
    url: String;
}, false>;
//# sourceMappingURL=dataTypes.d.ts.map