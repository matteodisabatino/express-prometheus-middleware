'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prom_client_1 = (0, tslib_1.__importDefault)(require("prom-client"));
const semver_1 = (0, tslib_1.__importDefault)(require("semver"));
const collectGarbageCollectionMetrics = (registry) => {
    Promise.resolve().then(() => (0, tslib_1.__importStar)(require('@matteodisabatino/gc_info'))).then(gcInfo => {
        const labelNames = ['gctype'];
        const registers = [registry];
        const gcCount = new prom_client_1.default.Counter({
            name: 'nodejs_gc_runs_total',
            help: 'Total number of garbage collections',
            labelNames,
            registers
        });
        const gcDuration = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_duration',
            help: 'Time the GC has been active',
            labelNames,
            registers
        });
        const gcTotalHeapSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_heap_size',
            help: 'Number of bytes V8 has allocated for the heap',
            labelNames,
            registers
        });
        const gcTotalHeapSizeExecutable = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_heap_size_executable',
            help: 'Number of bytes for compiled bytecode and JITed code',
            labelNames,
            registers
        });
        const gcUsedHeapSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_used_heap_size',
            help: 'Number of bytes in use by application data',
            labelNames,
            registers
        });
        const gcHeapSizeLimit = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_heap_size_limit',
            help: 'The absolute limit the heap cannot exceed',
            labelNames,
            registers
        });
        const gcTotalPhysicalSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_physical_size',
            help: 'Committed size',
            labelNames,
            registers
        });
        const gcTotalAvailableSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_available_size',
            help: 'Available heap size',
            labelNames,
            registers
        });
        const gcMallocedMemory = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_malloced_memory',
            help: 'Current amount of memory, obtained via malloc',
            labelNames,
            registers
        });
        const gcPeakMallocedMemory = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_peak_malloced_memory',
            help: 'Peak amount of memory, obtained via malloc',
            labelNames,
            registers
        });
        const gcNumberOfNativeContexts = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_number_of_native_contexts',
            help: 'Number of the top-level contexts currently active',
            labelNames,
            registers
        });
        const gcNumberOfDetachedContexts = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_number_of_detached_contexts',
            help: 'Number of contexts that were detached and not yet garbage collected',
            labelNames,
            registers
        });
        const gcExternalMemory = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_external_memory',
            help: "Number of bytes of memory allocated outside of v8's heap",
            labelNames,
            registers
        });
        const gcTotalGlobalHandlesSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_total_global_handles_size',
            help: 'Size of all global handles in the heap',
            labelNames,
            registers
        });
        const gcUsedGlobalHandlesSize = new prom_client_1.default.Gauge({
            name: 'nodejs_gc_used_global_handles_size',
            help: 'Size of all allocated/used global handles in the heap',
            labelNames,
            registers
        });
        gcInfo.on('data', (info) => {
            var _a;
            const gctype = (_a = Object
                .keys(gcInfo.GcType)
                .find((type) => {
                const gcTypes = gcInfo.GcType;
                return gcTypes[type] === info.gctype;
            })) !== null && _a !== void 0 ? _a : 'Unknown';
            gcCount.labels({ gctype }).inc();
            gcDuration.labels({ gctype }).set(info.duration);
            gcTotalHeapSize.labels({ gctype }).set(info.post.totalHeapSize);
            gcTotalHeapSizeExecutable.labels({ gctype }).set(info.post.totalHeapSizeExecutable);
            gcUsedHeapSize.labels({ gctype }).set(info.post.usedHeapSize);
            gcHeapSizeLimit.labels({ gctype }).set(info.post.heapSizeLimit);
            gcTotalPhysicalSize.labels({ gctype }).set(info.post.totalPhysicalSize);
            gcTotalAvailableSize.labels({ gctype }).set(info.post.totalAvailableSize);
            gcMallocedMemory.labels({ gctype }).set(info.post.mallocedMemory);
            gcPeakMallocedMemory.labels({ gctype }).set(info.post.peakMallocedMemory);
            gcNumberOfNativeContexts.labels({ gctype }).set(info.post.numberOfNativeContexts);
            gcNumberOfDetachedContexts.labels({ gctype }).set(info.post.numberOfDetachedContexts);
            if (semver_1.default.gte(semver_1.default.clean(process.version), '12.0.0')) {
                gcExternalMemory.labels({ gctype }).set(info.post.externalMemory);
            }
            if (semver_1.default.gte(semver_1.default.clean(process.version), '14.0.0')) {
                gcTotalGlobalHandlesSize.labels({ gctype }).set(info.post.totalGlobalHandlesSize);
                gcUsedGlobalHandlesSize.labels({ gctype }).set(info.post.usedGlobalHandlesSize);
            }
        });
    })
        .catch(() => { });
};
exports.default = collectGarbageCollectionMetrics;
//# sourceMappingURL=collectGarbageCollectionMetrics.js.map