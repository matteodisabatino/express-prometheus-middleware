# express-prometheus-middleware

Exposes Prometheus metrics for express applications. Based on [@trussle/tricorder](https://www.npmjs.com/package/@trussle/tricorder).

By default, the module exposes information about Prometheus default metrics, garbage collection metrics and the duration and the throughput of each HTTP route that has been called at least once via endpoint `/metrics`. However, you can customize this behaviour via options.

If you think that something can be done better, please provide a pull request.

## Please pay attention

I decided to have both [prom-client](https://www.npmjs.com/package/prom-client) and [@matteodisabatino/gc_info](https://www.npmjs.com/package/@matteodisabatino/gc_info) as dependencies instead of peer dependencies, this let me to have more control on the source code and to provide a ready to use module<sup>1</sup>.

However, this choice could generate some compatibility problems in future releases: if – for instance – a property has been set in `collectDefaultMetrics` and this property will be unsupported in a `prom-client` future release, Prometheus could act in an unexpected way. Dependency `@matteodisabatino/gc_info` instead doesn’t support all Node.js versions and a major upgrade could prevent the receiving of garbage collection metrics, in fact – exactly for this reason – the dependency is marked as optional.

So, to avoid strange behaviours, when a major upgrade will be performed either on `prom-client` or on `@matteodisabatino/gc_info` or on both, a new major release of this module will be provided. And – when this will happen – please read the official modules documentation and check if you have to make changes on your application.

<sup>(1)</sup> In truth, [express](https://www.npmjs.com/package/express) is required as peer dependency but this module is designed to return metrics data for express applications only and this means that if you decided to use this module you have previously installed express for sure.

## Available options

| Options | Type | Meaning | Default value |
| - | - | - | - |
| collectDefaultMetrics | boolean \| Prometheus.DefaultMetricsCollectorConfiguration | Whether or not to collect Prometheus default metrics | true |
| collectGCMetrics | boolean | Whether or not to collect garbage collection metrics | true |
| exclude | (req: express.Request): boolean | Avoid all matching routes to expose duration and throughput information | (req) => false |
| excludePaths | string[] | Avoid all matching paths to expose duration and throughput information | [] |
| url | string |The path to which expose metrics | /metrics |

## Usage

Require the module and use it as an express middleware.

### Basic

```js
const express = require('express')
const expressPrometheusMiddleware = require('@matteodisabatino/express-prometheus-middleware').default

const app = express()

app.use(expressPrometheusMiddleware())

app.listen(process.env.PORT, () => {
  console.log('Server has been started')
})
```

### Example of advanced usage

```js
const express = require('express')
const expressPrometheusMiddleware = require('@matteodisabatino/express-prometheus-middleware').default

const app = express()

app.use(expressPrometheusMiddleware({
  exclude: (req) => req.method === 'POST' && req.path === '/accounts'
  // This setting will prevent to generate duration and the throughput metrics
  // for route POST /accounts
}))

app.listen(process.env.PORT, () => {
  console.log('Server has been started')
})
```
