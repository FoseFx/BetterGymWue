import * as chai from 'chai';
import chaiHttp = require('chai-http');
import "mocha";
import { ErrorMessage, NormalResponse } from "./responses";

chai.use(chaiHttp);

const expect = chai.expect;

describe("Responses", () => {    

    describe("ErrorMessage", () => {    
        
        let stubRes = {
            _st: -1,
            _ctnd: {},
            status: (val: number) => {this._st = val; return stubRes;},
            json: (val: Object) => {this._ctnd = val; return stubRes;},
            end: () => {return JSON.stringify({status: this._st, json: this._ctnd});}
        };
        
        expect(
            // @ts-ignore
            ErrorMessage(stubRes, "This is a test message")
        ).to.equal('{"status":500,"json":{"error":true,"errorMessage":"This is a test message"}}');
    
        expect(
            // @ts-ignore
            ErrorMessage(stubRes, "This is another test message", 401)
        ).to.equal('{"status":401,"json":{"error":true,"errorMessage":"This is another test message"}}');
    
    });

    
    describe("NormalResponse", () => {    
        
        let stubRes = {
            _st: -1,
            _ctnd: {},
            status: (val: number) => {this._st = val; return stubRes;},
            json: (val: Object) => {this._ctnd = val; return stubRes;},
            end: () => {return {status: this._st, json: this._ctnd};}
        };

        expect(
            // @ts-ignore
            JSON.stringify(NormalResponse(stubRes, {msg: "This is a test message"}))
        ).to.equal('{"status":200,"json":{"msg":"This is a test message","error":false}}');
    
        expect(
            // @ts-ignore
            JSON.stringify(NormalResponse(stubRes, {test: "This is another test message"}, 401))
        ).to.equal('{"status":401,"json":{"test":"This is another test message","error":false}}');
    
        
        
    });

    
    
});