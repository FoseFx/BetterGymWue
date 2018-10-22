
import * as chai from 'chai';
import "mocha";
import * as sinon from "sinon";
import * as sinonChai from 'sinon-chai';
import {fetchVDFrame} from "./getVD";
import * as UTIL from "../util";
import {MOCKVD as m} from "../.tests/VD";
import {VERT_URL_L, VERT_URL_S} from "../CONFIG";
import {fetchWithCreds} from "../util";

const expect = chai.expect;

chai.use(sinonChai);
const schuelerCreds = {u: process.env.TEST_SCH_U, p: process.env.TEST_SCH_P};
const lehrerCreds = {u: process.env.TEST_SCH_U, p: process.env.TEST_SCH_P,
    l: {u: process.env.TEST_LEHRER_U, p: process.env.TEST_LEHRER_P}
};



describe('getVD', function () {

    describe('getFetchVDFrame', function () {

        afterEach(() => {
            try{
            //@ts-ignore
            UTIL.fetchWithCreds.restore();
            }catch (e) {

            }
        });

        it('should make connection to schueler Backend', async function () {
            this.timeout(5000);
            let stub = sinon.stub(UTIL, "fetchWithCreds").callsFake((url, creds, dontsave) => {
                expect(creds.u).to.equal(schuelerCreds.u);
                expect(creds.p).to.equal(schuelerCreds.p);
                expect(url).to.contain(VERT_URL_S);
                return Promise.resolve({textConverted: () => Promise.resolve(m.S.ONESLIDE)});
            });

            const res = await fetchVDFrame(schuelerCreds, "f1/", "24.12.", false);
            expect(stub).to.been.called;
        });

        it('should make connection to lehrer Backend', async function () {
            this.timeout(5000);
            let stub = sinon.stub(UTIL, "fetchWithCreds").callsFake((url, creds, dontsave) => {
                expect(creds.u).to.equal(lehrerCreds.l.u);
                expect(creds.p).to.equal(lehrerCreds.l.p);
                expect(url).to.contain(VERT_URL_L);
                return Promise.resolve({textConverted: () => Promise.resolve(m.L.ONESLIDE)});
            });

            const res = await fetchVDFrame(lehrerCreds.l, "f1/", "24.12.", true);
            expect(stub).to.been.called;
        });

        it('should return one slide', async function () {
            this.timeout(5000);
            let count = 0;
            const stub = sinon.stub(UTIL, "fetchWithCreds").resolves({
                textConverted: () => Promise.resolve(count === 0? m.S.ONESLIDE: m.L.ONESLIDE)
            });

            const sSlides = await fetchVDFrame(schuelerCreds, "f1/", "24.12.", false);
            expect(sSlides.length).to.equal(1);


            const lSlides = await fetchVDFrame(lehrerCreds.l, "f1/", "24.12.", true);
            expect(lSlides.length).to.equal(1);
        });

        it('should return three slides', async function () {


        });
    });

});