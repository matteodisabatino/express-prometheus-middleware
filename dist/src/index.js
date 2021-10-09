'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const on_finished_1 = (0, tslib_1.__importDefault)(require("on-finished"));
const prom_client_1 = (0, tslib_1.__importDefault)(require("prom-client"));
const runtypes_1 = require("runtypes");
const collectGarbageCollectionMetrics_1 = (0, tslib_1.__importDefault)(require("./libs/collectGarbageCollectionMetrics"));
const dataTypes_1 = require("./libs/dataTypes");
const utils_1 = require("./libs/utils");
const defaultOptions = Object.freeze({
    collectDefaultMetrics: true,
    collectGCMetrics: true,
    exclude: (req) => false,
    excludePaths: [],
    url: '/metrics'
});
const HTTPDuration = new prom_client_1.default.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'path', 'status']
});
const HTTPThroughput = new prom_client_1.default.Counter({
    name: 'http_requests_total',
    help: 'HTTP request throughput',
    labelNames: ['method', 'path', 'status']
});
const instrument = (options = {}) => {
    const opts = dataTypes_1.CompleteOptions.check(Object.assign({}, defaultOptions, options));
    if (opts.collectDefaultMetrics) {
        const defaultMetricsOptions = Object.assign({}, opts.collectDefaultMetrics);
        prom_client_1.default.collectDefaultMetrics(defaultMetricsOptions);
    }
    if (opts.collectGCMetrics) {
        (0, collectGarbageCollectionMetrics_1.default)(prom_client_1.default.register);
    }
    if (opts.exclude) {
        opts.exclude = (0, runtypes_1.Contract)(dataTypes_1.ExpressRequest, runtypes_1.Boolean).enforce(opts.exclude);
    }
    const metricsPathRegex = (0, utils_1.getURLRegExp)(opts.url);
    return (req, res, next) => {
        if (metricsPathRegex.test(req.path)) {
            prom_client_1.default.register.metrics()
                .then(metrics => {
                res.header('Content-Type', 'text/plain; charset=utf-8');
                res.status(200).send(metrics);
            })
                .catch(next);
            return;
        }
        try {
            if (opts.exclude(req)) {
                return next();
            }
        }
        catch (e) {
            return next(e);
        }
        if ((0, utils_1.isPathExcluded)(opts.excludePaths, req.path)) {
            return next();
        }
        const endTimer = HTTPDuration.startTimer();
        (0, on_finished_1.default)(res, () => {
            const labels = {
                method: req.method,
                path: req.path,
                status: res.statusCode
            };
            HTTPThroughput.labels(labels).inc();
            endTimer(labels);
        });
        next();
    };
};
exports.default = instrument;
//# sourceMappingURL=index.js.map