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
const app_1 = require("./app");
const conf_1 = require("../../source/src/app/conf");
chai.use(chaiHttp);
const expect = chai.expect;
describe('App', function () {
    describe('Failures', function () {
        it('should fail on no credentials', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const r = yield chai.request(app_1.default).get("/v2/http://www.gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm");
                expect(r.status).to.equal(401);
                expect(r.body.error).to.exist;
                expect(r.body.error).to.equal("Keine Zugangsdaten angegeben");
            });
        });
        // Note: this is a live test!
        it('should fail on invalid credentials', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const a0 = chai.request(app_1.default);
                const a1 = chai.request(app_1.default);
                const a2 = chai.request(app_1.default);
                const r = yield Promise.all([
                    a0.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                    a0.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("ü", " ü\\$ß"),
                    a0.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("", ""),
                    a0.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("a", "b"),
                    a1.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("ü", "u\\$ß"),
                    a1.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("", ""),
                    a1.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("a", "b"),
                    a2.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("ü", "u\\$ß"),
                    a2.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("", ""),
                    a2.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("a", "b"),
                    a2.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("ü", "u\\$ß"),
                    a2.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("", ""),
                ]);
                r.forEach((res, i) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.equal("Zugangsdaten sind falsch");
                });
            });
        });
        it('should fail on invalid route', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const r = yield Promise.all([
                    chai.request(app_1.default).get("/v2/some_route/lol%20-2345.php").auth("test", "test"),
                    chai.request(app_1.default).get("/ lol_").auth("test", "test"),
                    chai.request(app_1.default).get("/").auth("test", "test")
                ]);
                r.forEach(function (res, i) {
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.equal("Fehlerhafter Pfad");
                });
            });
        });
    });
    describe('Formals', function () {
        it('should respond with correct headers', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const r = yield Promise.all([
                    chai.request(app_1.default).get("/v2/http://www.gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm"),
                    chai.request(app_1.default).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                    chai.request(app_1.default).get("/v2/some_route/lol%20-2345.php").auth("test", "test"),
                    chai.request(app_1.default).options("/v2/http://www.gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm"),
                    chai.request(app_1.default).options("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                    chai.request(app_1.default).options("/v2/some_route/lol%20-2345.php").auth("test", "test")
                ]);
                r.forEach(function (res, i) {
                    expect(res.header["access-control-allow-origin"]).to.be.equal("*");
                    expect(res.header["access-control-allow-headers"]).to.be.equal("authorization");
                    expect(res.header["access-control-allow-methods"]).to.contain("OPTIONS").and.to.contain("GET");
                });
            });
        });
    });
    // Note: This is a live test!
    describe('Correct requests', function () {
        it('should answer with content requested', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const a = chai.request(app_1.default);
                const r = yield Promise.all([
                    a.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").set("Authorization", process.env.TEST_SCH_CREDS),
                    a.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").set("Authorization", process.env.TEST_SCH_CREDS),
                    a.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_001.htm").set("Authorization", process.env.TEST_LEHRER_CREDS),
                    a.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00001.htm").set("Authorization", process.env.TEST_LEHRER_CREDS),
                ]);
                const expects = [
                    /^.*06B.*Gymnasium der Stadt W.rselen.*$/,
                    /^.*Datum.*Stunde.*\(Fach\).*Art.*\(Raum\).*Raum.*Vertretungs-Text.*Gymnasium der Stadt W.rselen.*$/,
                    /^.*Vertr\..*Std.*Klasse.*Fach.*Raum.*fehlt.*Art.*Vertretungs-Text.*Gymnasium der Stadt W.rselen.*$/,
                    /^.*Ad.*Gymnasium der Stadt W.rselen.*$/,
                ];
                r.forEach(function (res, i) {
                    expect(res.text.replace(/(\n|\r|\n\r)/g, "")).to.match(expects[i]);
                });
            });
        });
    });
    describe('Version', function () {
        return __awaiter(this, void 0, void 0, function* () {
            expect((yield chai.request(app_1.default).get("/v2/version")).text).to.equal(conf_1.APP_VERSION);
        });
    });
});
//# sourceMappingURL=app.spec.js.map