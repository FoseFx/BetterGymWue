import * as chai from 'chai';
import chaiHttp = require('chai-http');
import "mocha";
import app from "./app";
import {registerRoute, API_VERSION} from "./app";

chai.use(chaiHttp);

const expect = chai.expect;

describe("app", () => {

    describe("registerRoute", () => {

        describe("get", async () => {
            const r = chai.request(app);
            registerRoute(
                "getSomeNiceTest", 
                "get", 
                (req, res) => {return res.end("get works")}
            );
            const get = await r.get(`/${API_VERSION}/getSomeNiceTest`);
            expect(get.text).to.equal("get works");
        });

        describe("post", async () => {
            const r = chai.request(app);
            registerRoute(
                "postSomeNiceTest", 
                "post", 
                (req, res) => {return res.end("post works")}
            );
            const post = await r.post(`/${API_VERSION}/postSomeNiceTest`);
            expect(post.text).to.equal("post works");

        });

        describe("options", async () => {
            const r = chai.request(app);
            registerRoute(
                "optionsSomeNiceTest", 
                "options", 
                (req, res) => {return res.end("options works")}
            );
            const options = await r.options(`/${API_VERSION}/optionsSomeNiceTest`);
            expect(options.text).to.equal("options works");
    
        });

    });

    

});