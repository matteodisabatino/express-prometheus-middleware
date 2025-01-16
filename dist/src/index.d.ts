import { type Static } from 'runtypes';
import type express from 'express';
import Prometheus from 'prom-client';
import { type Options } from './libs/data_types';
export declare class ExpressPrometheusMiddleware {
    constructor(options?: Static<typeof Options>);
    static get version(): string;
    get collectDefaultMetrics(): boolean | Prometheus.DefaultMetricsCollectorConfiguration<Prometheus.RegistryContentType>;
    get exclude(): (req: express.Request) => boolean;
    get excludePaths(): string[];
    get handler(): express.RequestHandler;
    get url(): string;
}
//# sourceMappingURL=index.d.ts.map