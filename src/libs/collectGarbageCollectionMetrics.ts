'use strict'
import { GcInfo } from '@matteodisabatino/gc_info'
import Prometheus from 'prom-client'
import semver from 'semver'

const collectGarbageCollectionMetrics = (registry: Prometheus.Registry): void => {
  import('@matteodisabatino/gc_info')
    .then(gcInfo => {
      const labelNames = ['gctype']
      const registers = [registry]

      const gcCount = new Prometheus.Counter({
        name: 'nodejs_gc_runs_total',
        help: 'Total number of garbage collections',
        labelNames,
        registers
      })

      const gcDuration = new Prometheus.Gauge({
        name: 'nodejs_gc_duration',
        help: 'Time the GC has been active',
        labelNames,
        registers
      })

      const gcTotalHeapSize = new Prometheus.Gauge({
        name: 'nodejs_gc_total_heap_size',
        help: 'Number of bytes V8 has allocated for the heap',
        labelNames,
        registers
      })

      const gcTotalHeapSizeExecutable = new Prometheus.Gauge({
        name: 'nodejs_gc_total_heap_size_executable',
        help: 'Number of bytes for compiled bytecode and JITed code',
        labelNames,
        registers
      })

      const gcUsedHeapSize = new Prometheus.Gauge({
        name: 'nodejs_gc_used_heap_size',
        help: 'Number of bytes in use by application data',
        labelNames,
        registers
      })

      const gcHeapSizeLimit = new Prometheus.Gauge({
        name: 'nodejs_gc_heap_size_limit',
        help: 'The absolute limit the heap cannot exceed',
        labelNames,
        registers
      })

      const gcTotalPhysicalSize = new Prometheus.Gauge({
        name: 'nodejs_gc_total_physical_size',
        help: 'Committed size',
        labelNames,
        registers
      })

      const gcTotalAvailableSize = new Prometheus.Gauge({
        name: 'nodejs_gc_total_available_size',
        help: 'Available heap size',
        labelNames,
        registers
      })

      const gcMallocedMemory = new Prometheus.Gauge({
        name: 'nodejs_gc_malloced_memory',
        help: 'Current amount of memory, obtained via malloc',
        labelNames,
        registers
      })

      const gcPeakMallocedMemory = new Prometheus.Gauge({
        name: 'nodejs_gc_peak_malloced_memory',
        help: 'Peak amount of memory, obtained via malloc',
        labelNames,
        registers
      })

      const gcNumberOfNativeContexts = new Prometheus.Gauge({
        name: 'nodejs_gc_number_of_native_contexts',
        help: 'Number of the top-level contexts currently active',
        labelNames,
        registers
      })

      const gcNumberOfDetachedContexts = new Prometheus.Gauge({
        name: 'nodejs_gc_number_of_detached_contexts',
        help: 'Number of contexts that were detached and not yet garbage collected',
        labelNames,
        registers
      })

      const gcExternalMemory = new Prometheus.Gauge({
        name: 'nodejs_gc_external_memory',
        help: "Number of bytes of memory allocated outside of v8's heap",
        labelNames,
        registers
      })

      const gcTotalGlobalHandlesSize = new Prometheus.Gauge({
        name: 'nodejs_gc_total_global_handles_size',
        help: 'Size of all global handles in the heap',
        labelNames,
        registers
      })

      const gcUsedGlobalHandlesSize = new Prometheus.Gauge({
        name: 'nodejs_gc_used_global_handles_size',
        help: 'Size of all allocated/used global handles in the heap',
        labelNames,
        registers
      })

      gcInfo.on('data', (info: GcInfo) => {
        const gctype = Object
          .keys(gcInfo.GcType)
          .find((type: string) => {
            const gcTypes: { [key: string]: any } = gcInfo.GcType
            return gcTypes[type] === info.gctype
          }) ?? 'Unknown'

        gcCount.labels({ gctype }).inc()
        gcDuration.labels({ gctype }).set(info.duration)
        gcTotalHeapSize.labels({ gctype }).set(info.post.totalHeapSize)
        gcTotalHeapSizeExecutable.labels({ gctype }).set(info.post.totalHeapSizeExecutable)
        gcUsedHeapSize.labels({ gctype }).set(info.post.usedHeapSize)
        gcHeapSizeLimit.labels({ gctype }).set(info.post.heapSizeLimit)
        gcTotalPhysicalSize.labels({ gctype }).set(info.post.totalPhysicalSize)
        gcTotalAvailableSize.labels({ gctype }).set(info.post.totalAvailableSize)
        gcMallocedMemory.labels({ gctype }).set(info.post.mallocedMemory)
        gcPeakMallocedMemory.labels({ gctype }).set(info.post.peakMallocedMemory)
        gcNumberOfNativeContexts.labels({ gctype }).set(info.post.numberOfNativeContexts)
        gcNumberOfDetachedContexts.labels({ gctype }).set(info.post.numberOfDetachedContexts)
        if (semver.gte(semver.clean(process.version)!, '12.0.0')) {
          gcExternalMemory.labels({ gctype }).set(info.post.externalMemory!)
        }

        if (semver.gte(semver.clean(process.version)!, '14.0.0')) {
          gcTotalGlobalHandlesSize.labels({ gctype }).set(info.post.totalGlobalHandlesSize!)
          gcUsedGlobalHandlesSize.labels({ gctype }).set(info.post.usedGlobalHandlesSize!)
        }
      })
    })
    .catch(() => { })
}

export default collectGarbageCollectionMetrics
