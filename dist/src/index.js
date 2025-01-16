"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressPrometheusMiddleware = void 0;
const runtypes_1 = require("runtypes");
const on_finished_1 = __importDefault(require("on-finished"));
const prom_client_1 = __importDefault(require("prom-client"));
const data_types_1 = require("./libs/data_types");
const utils_1 = require("./libs/utils");
const package_json_1 = __importDefault(require("../package.json"));
const privateVariablesInstanceMap = new WeakMap();
class ExpressPrometheusMiddlewarePrivateVariables {
    constructor(options = {}) {
        const defaultOptions = Object.freeze({
            collectDefaultMetrics: true,
            exclude: (req) => false,
            excludePaths: [],
            url: '/metrics'
        });
        const opts = data_types_1.CompleteOptions.check(Object.assign({}, defaultOptions, options));
        this.collectDefaultMetrics = opts.collectDefaultMetrics;
        this.exclude = opts.exclude;
        this.excludePaths = opts.excludePaths;
        this.url = opts.url.startsWith('/') ? opts.url : `/${opts.url}`;
    }
}
class ExpressPrometheusMiddleware {
    constructor(options = {}) {
        privateVariablesInstanceMap.set(this, new ExpressPrometheusMiddlewarePrivateVariables(options));
        if (this.collectDefaultMetrics) {
            const defaultMetricsOptions = Object.assign({}, this.collectDefaultMetrics);
            prom_client_1.default.collectDefaultMetrics(defaultMetricsOptions);
        }
    }
    static get version() {
        return package_json_1.default.version;
    }
    get collectDefaultMetrics() {
        return privateVariablesInstanceMap.get(this).collectDefaultMetrics;
    }
    get exclude() {
        return privateVariablesInstanceMap.get(this).exclude;
    }
    get excludePaths() {
        return privateVariablesInstanceMap.get(this).excludePaths;
    }
    get handler() {
        const urlRegex = (0, utils_1.getUrlRegExp)(this.url);
        const contractExclude = (0, runtypes_1.Contract)(data_types_1.ExpressRequest, runtypes_1.Boolean).enforce(this.exclude);
        const labelNames = ['method', 'path', 'status'];
        const HTTPDuration = new prom_client_1.default.Histogram({
            name: 'http_request_duration_seconds',
            help: 'HTTP request duration in seconds',
            labelNames
        });
        const HTTPThroughput = new prom_client_1.default.Counter({
            name: 'http_requests_total',
            help: 'HTTP request throughput',
            labelNames
        });
        return (req, res, next) => {
            try {
                if (urlRegex.test(req.path)) {
                    const promiseMetrics = new Promise((resolve, reject) => {
                        try {
                            const maybePromise = prom_client_1.default.register.metrics();
                            if (maybePromise instanceof Promise) {
                                maybePromise
                                    .then(resolve)
                                    .catch(reject);
                            }
                            else {
                                resolve(maybePromise);
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    promiseMetrics
                        .then(metrics => {
                        res.header('Content-Type', prom_client_1.default.register.contentType);
                        res.status(200).send(metrics);
                    })
                        .catch(next);
                    return;
                }
                if (contractExclude(req)) {
                    next();
                    return;
                }
                if ((0, utils_1.isPathExcluded)(this.excludePaths, req.path)) {
                    next();
                    return;
                }
                const endTimer = HTTPDuration.startTimer();
                (0, on_finished_1.default)(res, () => {
                    const labels = {
                        method: req.method,
                        path: req.route ? req.baseUrl + String(req.route.path) : req.path,
                        status: res.statusCode
                    };
                    HTTPThroughput.inc(labels);
                    endTimer(labels);
                });
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    get url() {
        return privateVariablesInstanceMap.get(this).url;
    }
}
exports.ExpressPrometheusMiddleware = ExpressPrometheusMiddleware;
//# sourceMappingURL=index.js.map