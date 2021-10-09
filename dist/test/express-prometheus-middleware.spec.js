'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const ava_1 = (0, tslib_1.__importDefault)(require("ava"));
const index_1 = (0, tslib_1.__importDefault)(require("../src/index"));
let app;
ava_1.default.before(() => {
    app = (0, express_1.default)();
    app.use((0, index_1.default)({
        exclude: (req) => req.path === '/test1',
        excludePaths: ['/test2']
    }));
    app.get('/test1', (req, res) => res.sendStatus(200));
    app.get('/test2', (req, res) => res.sendStatus(200));
    app.get('/test3', (req, res) => res.sendStatus(200));
    app.get('/test4', (req, res) => res.sendStatus(200));
});
(0, ava_1.default)('Should get metrics data', (t) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    // Call routes to get information about
    yield (0, supertest_1.default)(app).get('/test1');
    yield (0, supertest_1.default)(app).get('/test2');
    yield (0, supertest_1.default)(app).get('/test3');
    yield (0, supertest_1.default)(app).get('/test4');
    const res = yield (0, supertest_1.default)(app)
        .get('/metrics');
    t.is(res.status, 200);
    t.is(res.text.includes('http_requests_total{method="GET",path="/test1",status="200"}'), false);
    t.is(res.text.includes('http_requests_total{method="GET",path="/test2",status="200"}'), false);
    t.is(res.text.includes('http_requests_total{method="GET",path="/test3",status="200"}'), true);
    t.is(res.text.includes('http_requests_total{method="GET",path="/test4",status="200"}'), true);
}));
//# sourceMappingURL=express-prometheus-middleware.spec.js.map