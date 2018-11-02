
import * as chai from 'chai';
import "mocha";
import * as sinon from "sinon";
import * as sinonChai from 'sinon-chai';
import {analyzeVD, fetchVDFrame} from "./getVD";
import * as UTIL from "../util";
import {MOCKVD as m, MOCKVDEXPECT} from "../.tests/VD";
import {VERT_URL_L, VERT_URL_S} from "../CONFIG";
import {fetchWithCreds} from "../util";
import {VertretungsDaten} from "../../../source/src/app/Classes";

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
            this.timeout(5000);
            const map = ["subst_001.htm", "subst_002.htm", "subst_003.htm"];
            const stub = sinon.stub(UTIL, "fetchWithCreds").callsFake((args) => Promise.resolve({
                    textConverted: () => Promise.resolve(
                        m.S.THREESLIDES[ map.findIndex(v => v === args.replace(VERT_URL_S + "f1/", "")) ]
                    )
                })
            );

            const slides = await fetchVDFrame(schuelerCreds, "f1/", "24.12.", false);
            expect(slides.length).to.equal(3);

        });
    });

    describe('analyzeVD', function () {

        it('should pass schueler one slide', function () {
            let res: VertretungsDaten = analyzeVD([null,
                [ // one frame
                    [ // one slide
                        MOCKVDEXPECT.S_ONESLIDE, // slide payload
                        ["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"] // slide info
                    ]
                ]
            ]);

            // get keys
            const keys = [];
            MOCKVDEXPECT.S_ONESLIDE.forEach(v => {
                keys.push(v.stufe);
            });

            function f() {
                // info
                expect(res[0]).to.deep.equal(["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"]);

                expect(Object.keys(res[1])).to.deep.equal(keys);
            }
            f();
            res = analyzeVD([
                [ // one frame
                    [ // one slide
                        MOCKVDEXPECT.S_ONESLIDE, // slide payload
                        ["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"] // slide info
                    ]
                ],
                null
            ]);
            f();


        });

        it('should pass schueler three slides', function () {
            let res: VertretungsDaten = analyzeVD(
                [
                    null,
                    [
                        [
                            MOCKVDEXPECT.S_THREESLIDES[0],
                            ["Some test"]
                        ],[
                            MOCKVDEXPECT.S_THREESLIDES[1],
                            []
                        ],[
                            MOCKVDEXPECT.S_THREESLIDES[2],
                            []
                        ]
                    ]
                ]);

            const keys = [];
            MOCKVDEXPECT.S_THREESLIDES.forEach(v=>{
                v.forEach(vv=>{
                    keys.push(vv.stufe);
                })
            });
            function f() {
                expect(res[0]).to.deep.equal(["Some test"]);

                expect(Object.keys(res[1])).to.deep.equal(keys);
            }

            f();
            res = analyzeVD(
                [
                    [
                        [
                            MOCKVDEXPECT.S_THREESLIDES[0],
                            ["Some test"]
                        ],
                        [
                            MOCKVDEXPECT.S_THREESLIDES[1],
                            []
                        ],
                        [
                            MOCKVDEXPECT.S_THREESLIDES[2],
                            []
                        ]
                    ],
                    null
                ]);
            f();


        });

        it('should pass no slides', function () {
            const res = analyzeVD([null, null]);
            expect(res).to.equal(null);
        });

    });

});