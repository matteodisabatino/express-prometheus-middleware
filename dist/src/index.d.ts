import { Static } from 'runtypes';
import express from 'express';
import Prometheus from 'prom-client';
import { Options } from './libs/data_types';
export declare class ExpressPrometheusMiddleware {
    readonly collectDefaultMetrics: boolean | Prometheus.DefaultMetricsCollectorConfiguration;
    readonly collectGCMetrics: boolean;
    readonly exclude: (req: express.Request) => boolean;
    readonly excludePaths: string[];
    readonly url: string;
    readonly version: string;
    constructor(options?: Static<typeof Options>);
    get handler(): express.RequestHandler;
}
//# sourceMappingURL=index.d.ts.map