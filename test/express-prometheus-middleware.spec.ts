import express from 'express'
import request from 'supertest'
import test from 'ava'

import { ExpressPrometheusMiddleware } from '../src/index'

let app: express.Express
const epm = new ExpressPrometheusMiddleware({
  exclude: (req: express.Request) => req.path === '/test1',
  excludePaths: ['/test2']
})

test.before(() => {
  app = express()
  app.use(epm.handler)

  app.get('/test1', (req, res) => res.sendStatus(200))
  app.get('/test2', (req, res) => res.sendStatus(200))
  app.get('/test3', (req, res) => res.sendStatus(200))
  app.get('/test4', (req, res) => res.sendStatus(200))
})

test('Should get metrics data', async t => {
  // Call routes to get information about
  await request(app).get('/test1')
  await request(app).get('/test2')
  await request(app).get('/test3')
  await request(app).get('/test4')

  const res = await request(app)
    .get('/metrics')

  t.is(res.status, 200)
  t.is(res.text.includes('http_requests_total{method="GET",path="/test1",status="200"}'), false)
  t.is(res.text.includes('http_requests_total{method="GET",path="/test2",status="200"}'), false)
  t.is(res.text.includes('http_requests_total{method="GET",path="/test3",status="200"}'), true)
  t.is(res.text.includes('http_requests_total{method="GET",path="/test4",status="200"}'), true)
})
