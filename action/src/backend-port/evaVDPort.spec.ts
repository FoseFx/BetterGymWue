
import * as chai from 'chai';
import "mocha";
import {MOCKVD as m, MOCKVDEXPECT} from "../.tests/VD";
import {evaVDPort} from "./evaVDPort";
import {VertretungsEva} from "../../../source/src/app/Classes";

const expect = chai.expect;


describe('evaVD', function () {

    describe('schueler', function () {

        it('should pass schueler case 1', function () {
            let eva: VertretungsEva = evaVDPort(m.S.ONESLIDE, false);
            // File
            expect(eva[0]).to.be.equal("subst_001.htm");
            // info
            expect(eva[1][1].length).to.equal(0);
            // payload
            expect(eva[1][0].length).to.equal(3);
            expect(eva[1][0]).to.deep.equal(MOCKVDEXPECT.S_ONESLIDE)
        });

        it('should pass schueler case 2.1', function () {
            let eva: VertretungsEva = evaVDPort(m.S.THREESLIDES[0], false);
            // File
            expect(eva[0]).to.be.equal("subst_002.htm");
            // info
            expect(eva[1][1]).to.deep.equal(["<b>Nachrichten zum Tag</b>", "<b>Abwesende Klassen</b>", "<b>Stufe43</b>"]);
            // payload
            expect(eva[1][0].length).to.equal(6);
            expect(eva[1][0]).to.deep.equal(MOCKVDEXPECT.S_THREESLIDES[0])

        });

        it('should pass schueler case 2.2', function () {
            let eva: VertretungsEva = evaVDPort(m.S.THREESLIDES[1], false);
            // File
            expect(eva[0]).to.be.equal("subst_003.htm");
            // info
            expect(eva[1][1].length).to.equal(0);
            // payload
            expect(eva[1][0].length).to.equal(8);
            expect(eva[1][0]).to.deep.equal(MOCKVDEXPECT.S_THREESLIDES[1])

        });


        it('should pass schueler case 2.3', function () {
            let eva: VertretungsEva = evaVDPort(m.S.THREESLIDES[2], false);
            // File
            expect(eva[0]).to.be.equal("subst_001.htm");
            // info
            expect(eva[1][1].length).to.equal(0);
            // payload
            expect(eva[1][0].length).to.equal(6);
            expect(eva[1][0]).to.deep.equal(MOCKVDEXPECT.S_THREESLIDES[2])

        });


    });



});