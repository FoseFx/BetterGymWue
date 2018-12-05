"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
const hash_1 = require("./hash");
chai.use(chaiHttp);
const expect = chai.expect;
describe('Hash', function () {
    describe('querys', function () {
        it('should fail without stufe', function () {
            // @ts-ignore
            hash_1.HashHandler({ query: {} }, {
                val: {},
                json: function (v) { this.val = v; return this; },
                end: function () {
                    expect(this.val).to.deep.equal({ "error": "No Stufe provided" });
                }
            });
        });
        it('should not fail with stufe', function () {
            // @ts-ignore
            hash_1.HashHandler({ query: { stufe: "TestStufe1" } }, {
                val: {},
                json: function (v) { this.val = v; return this; },
                end: function () {
                    expect(this.val).not.to.deep.equal({ "error": "No Stufe provided" });
                }
            });
        });
    });
    it('should calcHash', function () {
        expect(hash_1.calcHash("123456", "123456")).to.equal("e10adc3949ba59abbe56e057f20f883ee10adc3949ba59abbe56e057f20f883e");
        expect(hash_1.calcHash("\n\t123456", "123456")).to.equal("dce57538b92b9fb1cfe3eafb12c3f87fe10adc3949ba59abbe56e057f20f883e");
    });
    it('should to5', function () {
        expect(hash_1.to5("1")).to.equal("00001");
        expect(hash_1.to5("10")).to.equal("00010");
        expect(hash_1.to5("10e")).to.equal("0010e");
        expect(hash_1.to5("10e?")).to.equal("010e?");
        expect(hash_1.to5("x10e?")).to.equal("x10e?");
        expect(hash_1.to5("12x10e?")).to.equal("12x10e?");
    });
});
//# sourceMappingURL=hash.spec.js.map