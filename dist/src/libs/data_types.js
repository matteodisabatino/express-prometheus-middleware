"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.ExpressRequest = exports.CompleteOptions = exports.PromClientDefaultMetricsCollectorConfiguration = exports.PromClientRegistry = void 0;
const runtypes_1 = require("runtypes");
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
exports.PromClientRegistry = runtypes_1.Unknown.withGuard((obj) => obj instanceof prom_client_1.default.Registry);
exports.PromClientDefaultMetricsCollectorConfiguration = (0, runtypes_1.Object)({
    timeout: runtypes_1.Number.undefinedable().optional(), // prom-client@^11
    register: exports.PromClientRegistry.undefinedable().optional(), // prom-client@^11, prom-client@^12, prom-client@^13, prom-client@^14
    prefix: runtypes_1.String.undefinedable().optional(), // prom-client@^12, prom-client@^13, prom-client@^14
    gcDurationBuckets: (0, runtypes_1.Array)(runtypes_1.Number).undefinedable().optional(), // prom-client@^12, prom-client@^13, prom-client@^14
    eventLoopMonitoringPrecision: runtypes_1.Number.undefinedable().optional(), // prom-client@^12, prom-client@^13, prom-client@^14
    labels: runtypes_1.Unknown.withGuard((obj) => globalThis.Object.prototype.toString.call(obj) === '[object Object]').undefinedable().optional() // prom-client@^13, prom-client@^14
});
exports.CompleteOptions = (0, runtypes_1.Object)({
    collectDefaultMetrics: (0, runtypes_1.Union)(runtypes_1.Boolean, exports.PromClientDefaultMetricsCollectorConfiguration),
    exclude: runtypes_1.Function,
    excludePaths: (0, runtypes_1.Array)(runtypes_1.String),
    url: runtypes_1.String
});
exports.ExpressRequest = runtypes_1.Unknown.withGuard((obj) => globalThis.Object.prototype.isPrototypeOf.call(express_1.default.request, obj));
exports.Options = (0, runtypes_1.Object)({
    collectDefaultMetrics: (0, runtypes_1.Union)(runtypes_1.Boolean, exports.PromClientDefaultMetricsCollectorConfiguration).undefinedable().optional(),
    exclude: runtypes_1.Function.undefinedable().optional(),
    excludePaths: (0, runtypes_1.Array)(runtypes_1.String).undefinedable().optional(),
    url: runtypes_1.String.undefinedable().optional()
});
//# sourceMappingURL=data_types.js.map