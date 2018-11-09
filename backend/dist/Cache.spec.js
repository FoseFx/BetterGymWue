"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
const Cache_1 = require("./Cache");
chai.use(chaiHttp);
const expect = chai.expect;
describe('Cache', function () {
    it('should create with given ttl', function () {
        let ttl = 6;
        let c = new Cache_1.default(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
        ttl = -10;
        c = new Cache_1.default(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
        ttl = 10000000;
        c = new Cache_1.default(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
        ttl = 10.5;
        c = new Cache_1.default(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
    });
    it('should set and get', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let c = new Cache_1.default(1000);
            let r = yield c.get("1", () => Promise.resolve({ ok: false }));
            expect(r.ok).to.be.equal(false);
            r = yield c.get("1", () => Promise.resolve({ ok: true, content: "string" }));
            expect(r.ok).to.be.equal(false);
            expect(r.ok).not.to.be.equal(true);
            expect(r.content).not.to.exist;
        });
    });
    it('should set when ttl is expired', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(3000);
            let c = new Cache_1.default(1);
            let r = yield c.get("1", () => Promise.resolve({ ok: true, content: "string" }));
            yield new Promise((res) => { setTimeout(() => { res(); }, 1500); });
            r = yield c.get("1", () => Promise.resolve({ ok: true, content: "another string" }));
            expect(r.content).to.equal("another string");
        });
    });
    it('should delete', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let c = new Cache_1.default(10);
            let r = yield c.get("1", () => Promise.resolve({ ok: true, content: "string" }));
            expect(c.cache.keys().length).to.equal(1);
            c.del("1");
            expect(c.cache.keys().length).to.equal(0);
        });
    });
    it('should delete when not existent', function () {
        let c = new Cache_1.default(10);
        c.del("1");
        expect(c.cache.keys().length).to.equal(0);
    });
    it('should flush', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let c = new Cache_1.default(10);
            yield c.get("1", () => Promise.resolve({ ok: true, content: "string" }));
            yield c.get("2", () => Promise.resolve({ ok: true, content: "string2" }));
            yield c.get("3", () => Promise.resolve({ ok: false }));
            expect(c.cache.keys().length).to.equal(3);
            c.flush();
            expect(c.cache.keys().length).to.equal(0);
        });
    });
});
//# sourceMappingURL=Cache.spec.js.map