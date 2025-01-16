"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.ExpressRequest = exports.CompleteOptions = exports.PromClientDefaultMetricsCollectorConfiguration = exports.PromClientRegistry = void 0;
const runtypes_1 = require("runtypes");
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
exports.PromClientRegistry = (0, runtypes_1.Guard)((obj) => obj instanceof prom_client_1.default.Registry);
exports.PromClientDefaultMetricsCollectorConfiguration = (0, runtypes_1.Partial)({
    timeout: runtypes_1.Number, // prom-client@^11
    register: exports.PromClientRegistry, // prom-client@^11, prom-client@^12, prom-client@^13, prom-client@^14
    prefix: runtypes_1.String, // prom-client@^12, prom-client@^13, prom-client@^14
    gcDurationBuckets: (0, runtypes_1.Array)(runtypes_1.Number), // prom-client@^12, prom-client@^13, prom-client@^14
    eventLoopMonitoringPrecision: runtypes_1.Number, // prom-client@^12, prom-client@^13, prom-client@^14
    labels: (0, runtypes_1.Guard)((obj) => Object.prototype.toString.call(obj) === '[object Object]') // prom-client@^13, prom-client@^14
});
exports.CompleteOptions = (0, runtypes_1.Record)({
    collectDefaultMetrics: runtypes_1.Boolean.Or(exports.PromClientDefaultMetricsCollectorConfiguration),
    collectGCMetrics: runtypes_1.Boolean,
    exclude: runtypes_1.Function,
    excludePaths: (0, runtypes_1.Array)(runtypes_1.String),
    url: runtypes_1.String
});
exports.ExpressRequest = (0, runtypes_1.Guard)((obj) => Object.prototype.isPrototypeOf.call(express_1.default.request, obj));
exports.Options = (0, runtypes_1.Partial)({
    collectDefaultMetrics: runtypes_1.Boolean.Or(exports.PromClientDefaultMetricsCollectorConfiguration),
    collectGCMetrics: runtypes_1.Boolean,
    exclude: runtypes_1.Function,
    excludePaths: (0, runtypes_1.Array)(runtypes_1.String),
    url: runtypes_1.String
});
//# sourceMappingURL=data_types.js.map