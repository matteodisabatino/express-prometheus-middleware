"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressPrometheusMiddleware = void 0;
const runtypes_1 = require("runtypes");
const gc_info_1 = __importDefault(require("@matteodisabatino/gc_info"));
const on_finished_1 = __importDefault(require("on-finished"));
const prom_client_1 = __importDefault(require("prom-client"));
const semver_1 = __importDefault(require("semver"));
const data_types_1 = require("./libs/data_types");
const utils_1 = require("./libs/utils");
const package_json_1 = __importDefault(require("../package.json"));
const privateVariablesInstanceMap = new WeakMap();
const collectGarbageCollectionMetrics = () => {
    const labelNames = ['gctype'];
    const countMetric = new prom_client_1.default.Counter({
        name: 'nodejs_gc_runs_total',
        help: 'Total number of garbage collections',
        labelNames
    });
    const durationMetric = new prom_client_1.default.Gauge({
        name: 'nodejs_gc_duration',
        help: 'Time the GC has been active',
        labelNames
    });
    const memoryMetrics = {
        totalHeapSize: new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_heap_size',
            help: 'Number of bytes V8 has allocated for the heap',
            labelNames
        }),
        totalHeapSizeExecutable: new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_heap_size_executable',
            help: 'Number of bytes for compiled bytecode and JITed code',
            labelNames
        }),
        usedHeapSize: new prom_client_1.default.Gauge({
            name: 'nodejs_gc_used_heap_size',
            help: 'Number of bytes in use by application data',
            labelNames
        }),
        heapSizeLimit: new prom_client_1.default.Gauge({
            name: 'nodejs_gc_heap_size_limit',
            help: 'The absolute limit the heap cannot exceed',
            labelNames
        })
    };
    if (semver_1.default.gte(process.version, '0.12.0')) {
        memoryMetrics.totalPhysicalSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_physical_size',
            help: 'Committed size',
            labelNames
        });
    }
    if (semver_1.default.gte(process.version, '4.0.0')) {
        memoryMetrics.totalAvailableSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_available_size',
            help: 'Available heap size',
            labelNames
        });
    }
    if (semver_1.default.gte(process.version, '7.0.0')) {
        memoryMetrics.mallocedMemory = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_malloced_memory',
            help: 'Current amount of memory, obtained via malloc',
            labelNames
        });
        memoryMetrics.peakMallocedMemory = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_peak_malloced_memory',
            help: 'Peak amount of memory, obtained via malloc',
            labelNames
        });
    }
    if (semver_1.default.gte(process.version, '10.0.0')) {
        memoryMetrics.numberOfNativeContexts = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_number_of_native_contexts',
            help: 'Number of the top-level contexts currently active',
            labelNames
        });
        memoryMetrics.numberOfDetachedContexts = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_number_of_detached_contexts',
            help: 'Number of contexts that were detached and not yet garbage collected',
            labelNames
        });
    }
    if (semver_1.default.gte(process.version, '12.0.0')) {
        memoryMetrics.externalMemory = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_external_memory',
            help: "Number of bytes of memory allocated outside of v8's heap",
            labelNames
        });
    }
    if (semver_1.default.gte(process.version, '14.0.0')) {
        memoryMetrics.totalGlobalHandlesSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_global_handles_size',
            help: 'Size of all global handles in the heap',
            labelNames
        });
        memoryMetrics.usedGlobalHandlesSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_used_global_handles_size',
            help: 'Size of all allocated/used global handles in the heap',
            labelNames
        });
    }
    gc_info_1.default.on('data', (info) => {
        var _a;
        const gctype = (_a = gc_info_1.default.GcType[info.gctype]) !== null && _a !== void 0 ? _a : 'Unknown';
        countMetric.inc({ gctype });
        durationMetric.set({ gctype }, info.duration);
        memoryMetrics.totalHeapSize.set({ gctype }, info.post.totalHeapSize);
        memoryMetrics.totalHeapSizeExecutable.set({ gctype }, info.post.totalHeapSizeExecutable);
        memoryMetrics.usedHeapSize.set({ gctype }, info.post.usedHeapSize);
        memoryMetrics.heapSizeLimit.set({ gctype }, info.post.heapSizeLimit);
        if (semver_1.default.gte(process.version, '0.12.0')) {
            memoryMetrics.totalPhysicalSize.set({ gctype }, info.post.totalPhysicalSize);
        }
        if (semver_1.default.gte(process.version, '4.0.0')) {
            memoryMetrics.totalAvailableSize.set({ gctype }, info.post.totalAvailableSize);
        }
        if (semver_1.default.gte(process.version, '7.0.0')) {
            memoryMetrics.mallocedMemory.set({ gctype }, info.post.mallocedMemory);
            memoryMetrics.peakMallocedMemory.set({ gctype }, info.post.peakMallocedMemory);
        }
        if (semver_1.default.gte(process.version, '10.0.0')) {
            memoryMetrics.numberOfNativeContexts.set({ gctype }, info.post.numberOfNativeContexts);
            memoryMetrics.numberOfDetachedContexts.set({ gctype }, info.post.numberOfDetachedContexts);
        }
        if (semver_1.default.gte(process.version, '12.0.0')) {
            memoryMetrics.externalMemory.set({ gctype }, info.post.externalMemory);
        }
        if (semver_1.default.gte(process.version, '14.0.0')) {
            memoryMetrics.totalGlobalHandlesSize.set({ gctype }, info.post.totalGlobalHandlesSize);
            memoryMetrics.usedGlobalHandlesSize.set({ gctype }, info.post.usedGlobalHandlesSize);
        }
    });
};
class ExpressPrometheusMiddlewarePrivateVariables {
    constructor(options = {}) {
        const defaultOptions = Object.freeze({
            collectDefaultMetrics: true,
            collectGCMetrics: true,
            exclude: (req) => false,
            excludePaths: [],
            url: '/metrics'
        });
        const opts = data_types_1.CompleteOptions.check(Object.assign({}, defaultOptions, options));
        this.collectDefaultMetrics = opts.collectDefaultMetrics;
        this.collectGCMetrics = opts.collectGCMetrics;
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
        if (this.collectGCMetrics) {
            collectGarbageCollectionMetrics();
        }
    }
    static get version() {
        return package_json_1.default.version;
    }
    get collectDefaultMetrics() {
        return privateVariablesInstanceMap.get(this).collectDefaultMetrics;
    }
    get collectGCMetrics() {
        return privateVariablesInstanceMap.get(this).collectGCMetrics;
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