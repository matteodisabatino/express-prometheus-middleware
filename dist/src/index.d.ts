import express from 'express';
import { Static } from 'runtypes';
import { Options } from './libs/dataTypes';
declare const instrument: (options?: Static<typeof Options>) => express.RequestHandler;
export default instrument;
//# sourceMappingURL=index.d.ts.map