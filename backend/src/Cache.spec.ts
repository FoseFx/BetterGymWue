
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import "mocha";
import Cache from "./Cache";
import {__await} from "tslib";
import {FetchResult} from "./types/FetchResult";

chai.use(chaiHttp);

const expect = chai.expect;

describe('Cache', function () {

    it('should create with given ttl', function () {
        let ttl = 6;
        let c = new Cache(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
        ttl = -10;
        c = new Cache(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
        ttl = 10000000;
        c = new Cache(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
        ttl = 10.5;
        c = new Cache(ttl);
        expect(c.cache.options.stdTTL).to.be.equal(ttl);
    });

    it('should set and get', async function () {

        let c = new Cache(1000);
        let r = <FetchResult>await c.get("1", ()=>Promise.resolve({ok: false}));
        expect(r.ok).to.be.equal(false);
        r = <FetchResult>await c.get("1", ()=>Promise.resolve({ok:true, content: "string"}));
        expect(r.ok).to.be.equal(false);
        expect(r.ok).not.to.be.equal(true);
        expect(r.content).not.to.exist;

    });

    it('should set when ttl is expired', async function () {
        this.timeout(3000);
        let c = new Cache(1);
        let r = <FetchResult>await c.get("1", ()=>Promise.resolve({ok: true, content: "string"}));
        await new Promise((res)=>{setTimeout(()=>{res()}, 1500)});
        r = <FetchResult>await c.get("1", ()=>Promise.resolve({ok: true, content: "another string"}));
        expect(r.content).to.equal("another string");
    });

    it('should delete', async function () {
        let c = new Cache(10);
        let r = await c.get("1", ()=>Promise.resolve({ok: true, content: "string"}));
        expect(c.cache.keys().length).to.equal(1);
        c.del("1");
        expect(c.cache.keys().length).to.equal(0);
    });

    it('should delete when not existent', function () {
        let c = new Cache(10);
        c.del("1");
        expect(c.cache.keys().length).to.equal(0);
    });

    it('should flush', async function () {
        let c = new Cache(10);
        await c.get("1", ()=>Promise.resolve({ok: true, content: "string"}));
        await c.get("2", ()=>Promise.resolve({ok: true, content: "string2"}));
        await c.get("3", ()=>Promise.resolve({ok: false}));
        expect(c.cache.keys().length).to.equal(3);
        c.flush();
        expect(c.cache.keys().length).to.equal(0);
    });


});