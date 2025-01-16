"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const ava_1 = __importDefault(require("ava"));
const index_1 = require("../src/index");
let app;
const epm = new index_1.ExpressPrometheusMiddleware({
    exclude: (req) => req.path === '/test1',
    excludePaths: ['/test2']
});
ava_1.default.before(() => {
    app = (0, express_1.default)();
    app.use(epm.handler);
    app.get('/test1', (req, res) => res.sendStatus(200));
    app.get('/test2', (req, res) => res.sendStatus(200));
    app.get('/test3', (req, res) => res.sendStatus(200));
    app.get('/test4', (req, res) => res.sendStatus(200));
});
(0, ava_1.default)('Should get metrics data', (t) => __awaiter(void 0, void 0, void 0, function* () {
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