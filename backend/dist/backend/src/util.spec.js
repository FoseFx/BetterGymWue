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
const util_1 = require("./util");
const expect = chai.expect;
describe('util', function () {
    describe('fetchWithCreds', function () {
        // notice: I cannot give you the Creds :P
        // Note: this is a live test!
        it('should fetch with correct creds', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield Promise.all([
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm", process.env.TEST_LEHRER_CREDS),
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_001.htm", process.env.TEST_LEHRER_CREDS),
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm", process.env.TEST_SCH_CREDS),
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/36/c/c00021.htm", process.env.TEST_SCH_CREDS),
                ]);
                res.forEach(function (r, i) {
                    expect(r.ok).to.be.true;
                    expect(r.content).to.exist;
                    expect(r.content).to.contain("Gymnasium der Stadt W");
                });
            });
        });
        // Note: this is a live test!
        it('should fail without correct creds', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield Promise.all([
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm", "SomeBS"),
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_001.htm", "Basic Some BS "),
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm", "Basic nope"),
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/36/c/c00021.htm", "Basic SorryForTheSpam"),
                ]);
                res.forEach(function (r, i) {
                    expect(r.ok).to.be.false;
                    expect(r.content).not.to.exist;
                });
            });
        });
        it('should fail without correct url', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield Promise.all([
                    util_1.fetchWithCreds("http://gymnasium-wuerselen.de/", "SomeBS"),
                    util_1.fetchWithCreds("http://gymnasium-wuers", "Basic Some BS "),
                    util_1.fetchWithCreds("http://gymnasiumSchueler/f1/subst_001.htm", "Basic nope"),
                    util_1.fetchWithCreds("http://google.com", "Basic SorryForTheSpam"),
                ]);
                res.forEach(function (r) {
                    expect(r.ok).to.be.false;
                    expect(r.content).not.to.exist;
                });
            });
        });
    });
});
//# sourceMappingURL=util.spec.js.map