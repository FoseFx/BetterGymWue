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
require("mocha");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const getVD_1 = require("./getVD");
const UTIL = require("../util");
const VD_1 = require("../.tests/VD");
const CONFIG_1 = require("../CONFIG");
const expect = chai.expect;
chai.use(sinonChai);
const schuelerCreds = { u: process.env.TEST_SCH_U, p: process.env.TEST_SCH_P };
const lehrerCreds = { u: process.env.TEST_SCH_U, p: process.env.TEST_SCH_P,
    l: { u: process.env.TEST_LEHRER_U, p: process.env.TEST_LEHRER_P }
};
describe('getVD', function () {
    describe('getFetchVDFrame', function () {
        afterEach(() => {
            try {
                //@ts-ignore
                UTIL.fetchWithCreds.restore();
            }
            catch (e) {
            }
        });
        it('should make connection to schueler Backend', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(5000);
                let stub = sinon.stub(UTIL, "fetchWithCreds").callsFake((url, creds, dontsave) => {
                    expect(creds.u).to.equal(schuelerCreds.u);
                    expect(creds.p).to.equal(schuelerCreds.p);
                    expect(url).to.contain(CONFIG_1.VERT_URL_S);
                    return Promise.resolve({ textConverted: () => Promise.resolve(VD_1.MOCKVD.S.ONESLIDE) });
                });
                const res = yield getVD_1.fetchVDFrame(schuelerCreds, "f1/", "24.12.", false);
                expect(stub).to.been.called;
            });
        });
        it('should make connection to lehrer Backend', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(5000);
                let stub = sinon.stub(UTIL, "fetchWithCreds").callsFake((url, creds, dontsave) => {
                    expect(creds.u).to.equal(lehrerCreds.l.u);
                    expect(creds.p).to.equal(lehrerCreds.l.p);
                    expect(url).to.contain(CONFIG_1.VERT_URL_L);
                    return Promise.resolve({ textConverted: () => Promise.resolve(VD_1.MOCKVD.L.ONESLIDE) });
                });
                const res = yield getVD_1.fetchVDFrame(lehrerCreds.l, "f1/", "24.12.", true);
                expect(stub).to.been.called;
            });
        });
        it('should return one slide', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(5000);
                let count = 0;
                const stub = sinon.stub(UTIL, "fetchWithCreds").resolves({
                    textConverted: () => Promise.resolve(count === 0 ? VD_1.MOCKVD.S.ONESLIDE : VD_1.MOCKVD.L.ONESLIDE)
                });
                const sSlides = yield getVD_1.fetchVDFrame(schuelerCreds, "f1/", "24.12.", false);
                expect(sSlides.length).to.equal(1);
                const lSlides = yield getVD_1.fetchVDFrame(lehrerCreds.l, "f1/", "24.12.", true);
                expect(lSlides.length).to.equal(1);
            });
        });
        it('should return three slides', function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(5000);
                const map = ["subst_001.htm", "subst_002.htm", "subst_003.htm"];
                const stub = sinon.stub(UTIL, "fetchWithCreds").callsFake((args) => Promise.resolve({
                    textConverted: () => Promise.resolve(VD_1.MOCKVD.S.THREESLIDES[map.findIndex(v => v === args.replace(CONFIG_1.VERT_URL_S + "f1/", ""))])
                }));
                const slides = yield getVD_1.fetchVDFrame(schuelerCreds, "f1/", "24.12.", false);
                expect(slides.length).to.equal(3);
            });
        });
    });
    describe('analyzeVD', function () {
        it('should pass schueler one slide', function () {
            let res = getVD_1.analyzeVD([null,
                [
                    [
                        VD_1.MOCKVDEXPECT.S_ONESLIDE,
                        ["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"] // slide info
                    ]
                ]
            ]);
            // get keys
            const keys = [];
            VD_1.MOCKVDEXPECT.S_ONESLIDE.forEach(v => {
                keys.push(v.stufe);
            });
            function f() {
                // info
                expect(res[0]).to.deep.equal(["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"]);
                expect(Object.keys(res[1])).to.deep.equal(keys);
            }
            f();
            res = getVD_1.analyzeVD([
                [
                    [
                        VD_1.MOCKVDEXPECT.S_ONESLIDE,
                        ["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"] // slide info
                    ]
                ],
                null
            ]);
            f();
        });
        it('should pass schueler three slides', function () {
            let res = getVD_1.analyzeVD([
                null,
                [
                    [
                        VD_1.MOCKVDEXPECT.S_THREESLIDES[0],
                        ["Some test"]
                    ], [
                        VD_1.MOCKVDEXPECT.S_THREESLIDES[1],
                        []
                    ], [
                        VD_1.MOCKVDEXPECT.S_THREESLIDES[2],
                        []
                    ]
                ]
            ]);
            const keys = [];
            VD_1.MOCKVDEXPECT.S_THREESLIDES.forEach(v => {
                v.forEach(vv => {
                    keys.push(vv.stufe);
                });
            });
            function f() {
                expect(res[0]).to.deep.equal(["Some test"]);
                expect(Object.keys(res[1])).to.deep.equal(keys);
            }
            f();
            res = getVD_1.analyzeVD([
                [
                    [
                        VD_1.MOCKVDEXPECT.S_THREESLIDES[0],
                        ["Some test"]
                    ],
                    [
                        VD_1.MOCKVDEXPECT.S_THREESLIDES[1],
                        []
                    ],
                    [
                        VD_1.MOCKVDEXPECT.S_THREESLIDES[2],
                        []
                    ]
                ],
                null
            ]);
            f();
        });
        it('should pass no slides', function () {
            const res = getVD_1.analyzeVD([null, null]);
            expect(res).to.equal(null);
        });
    });
});
