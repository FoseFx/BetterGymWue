
import * as chai from 'chai';
import "mocha";
import * as sinon from "sinon";
import * as sinonChai from 'sinon-chai';
import * as test from "./getVD";
const expect = chai.expect;

chai.use(sinonChai);

describe('getVD', function () {

    describe('getVertretungsDaten', function () {

        it('should use correct function based on useLehrer', async function () {
            let spyLehrer = sinon.spy(test, "_getLehrerVertretungsDaten");
            let spySchueler = sinon.spy(test, "_getSchuelerVertretungsDaten");
            await test.getVertretungsdaten({u: "user", p: "passw"});
            expect(spySchueler).to.been.called;
            expect(spyLehrer).not.to.been.called;
        });

    });

});