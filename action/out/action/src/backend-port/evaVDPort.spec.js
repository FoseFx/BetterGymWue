"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
require("mocha");
const VD_1 = require("../.tests/VD");
const evaVDPort_1 = require("./evaVDPort");
const expect = chai.expect;
describe('evaVD', function () {
    describe('schueler', function () {
        it('should pass schueler case 1', function () {
            let eva = evaVDPort_1.evaVDPort(VD_1.MOCKVD.S.ONESLIDE, false);
            // File
            expect(eva[0]).to.be.equal("subst_001.htm");
            // info
            expect(eva[1][1].length).to.equal(0);
            // payload
            expect(eva[1][0].length).to.equal(3);
            expect(eva[1][0]).to.deep.equal(VD_1.MOCKVDEXPECT.S_ONESLIDE);
        });
        it('should pass schueler case 2.1', function () {
            let eva = evaVDPort_1.evaVDPort(VD_1.MOCKVD.S.THREESLIDES[0], false);
            // File
            expect(eva[0]).to.be.equal("subst_002.htm");
            // info
            expect(eva[1][1]).to.deep.equal(["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"]);
            // payload
            expect(eva[1][0].length).to.equal(6);
            expect(eva[1][0]).to.deep.equal(VD_1.MOCKVDEXPECT.S_THREESLIDES[0]);
        });
        it('should pass schueler case 2.2', function () {
            let eva = evaVDPort_1.evaVDPort(VD_1.MOCKVD.S.THREESLIDES[1], false);
            // File
            expect(eva[0]).to.be.equal("subst_003.htm");
            // info
            expect(eva[1][1].length).to.equal(0);
            // payload
            expect(eva[1][0].length).to.equal(8);
            expect(eva[1][0]).to.deep.equal(VD_1.MOCKVDEXPECT.S_THREESLIDES[1]);
        });
        it('should pass schueler case 2.3', function () {
            let eva = evaVDPort_1.evaVDPort(VD_1.MOCKVD.S.THREESLIDES[2], false);
            // File
            expect(eva[0]).to.be.equal("subst_001.htm");
            // info
            expect(eva[1][1].length).to.equal(0);
            // payload
            expect(eva[1][0].length).to.equal(6);
            expect(eva[1][0]).to.deep.equal(VD_1.MOCKVDEXPECT.S_THREESLIDES[2]);
        });
    });
    describe('lehrer', function () {
        it('should pass lehrer case 1', function () {
            let eva = evaVDPort_1.evaVDPort(VD_1.MOCKVD.L.ONESLIDE, false);
            //console.log(JSON.stringify(eva[1][0], null, 2));
            // File
            expect(eva[0]).to.be.equal("subst_001.htm");
            // info
            expect(eva[1][1]).to.deep.equal([
                "<b>Nachrichten zum Tag</b>",
                "<b>Abwesende Lehrer</b>",
                "<b>lehrer1 (5-11), lehrer2, lehrer3 (5-11), lehrer4, lehrer5 (5-11), lehrer6, lehrer7, lehrer8, lehrer9, lehrer10, lehrer11 (5-11), lehrer12, lehrer13, lehrer14 (5-11), lehrer15 (5-6), lehrer16, lehrer17 (5-11), lehrer18 (5-11), lehrer19 (5-11)</b>",
                "Abwesende Klassen",
                "Stufe43"
            ]);
            // payload
            expect(eva[1][0].length).to.equal(7);
            expect(eva[1][0]).to.deep.equal(VD_1.MOCKVDEXPECT.L_ONESLIDE);
        });
    });
});
