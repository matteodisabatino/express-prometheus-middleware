'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.ExpressRequest = exports.CompleteOptions = void 0;
const runtypes_1 = require("runtypes");
exports.CompleteOptions = (0, runtypes_1.Record)({
    collectDefaultMetrics: runtypes_1.Boolean.Or(runtypes_1.Unknown.withGuard((obj) => Object.prototype.toString.call(obj) === '[object Object]')),
    collectGCMetrics: runtypes_1.Boolean,
    exclude: runtypes_1.Function,
    excludePaths: (0, runtypes_1.Array)(runtypes_1.String),
    url: runtypes_1.String
});
exports.ExpressRequest = runtypes_1.Unknown.withGuard((obj) => typeof obj.get === 'function' ||
    typeof obj.header === 'function');
exports.Options = (0, runtypes_1.Partial)({
    collectDefaultMetrics: runtypes_1.Boolean.Or(runtypes_1.Unknown.withGuard((obj) => Object.prototype.toString.call(obj) === '[object Object]')),
    collectGCMetrics: runtypes_1.Boolean,
    exclude: runtypes_1.Function,
    excludePaths: (0, runtypes_1.Array)(runtypes_1.String),
    url: runtypes_1.String
});
//# sourceMappingURL=dataTypes.js.map