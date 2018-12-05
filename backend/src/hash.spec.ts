
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import "mocha";
import {calcHash, HashHandler, to5} from "./hash";

chai.use(chaiHttp);

const expect = chai.expect;

describe('Hash', function () {

    describe('querys', function () {

        it('should fail without stufe', function () {
            // @ts-ignore
            HashHandler({query: {}}, {
                val: {},
                json: function(v: JSON){this.val = v; return this;},
                end: function () {
                    expect(this.val).to.deep.equal({"error":"No Stufe provided"});
                }
            });
        });


        it('should not fail with stufe', function () {
            // @ts-ignore
            HashHandler({query: {stufe: "TestStufe1"}}, {
                val: {},
                json: function(v: JSON){this.val = v; return this;},
                end: function () {
                    expect(this.val).not.to.deep.equal({"error":"No Stufe provided"});
                }
            });
        });

    });

    it('should calcHash', function () {
        expect(calcHash("123456", "123456")).to.equal("e10adc3949ba59abbe56e057f20f883ee10adc3949ba59abbe56e057f20f883e");
        expect(calcHash("\n\t123456", "123456")).to.equal("e10adc3949ba59abbe56e057f20f883ee10adc3949ba59abbe56e057f20f883e");
    });

    it('should to5', function () {
        expect(to5("1")).to.equal("00001");
        expect(to5("10")).to.equal("00010");
        expect(to5("10e")).to.equal("0010e");
        expect(to5("10e?")).to.equal("010e?");
        expect(to5("x10e?")).to.equal("x10e?");
        expect(to5("12x10e?")).to.equal("12x10e?");
    });


});