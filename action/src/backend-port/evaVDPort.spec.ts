
import * as chai from 'chai';
import "mocha";
import {MOCKVD as m} from "../.tests/VD";
import {VERT_URL_L, VERT_URL_S} from "../CONFIG";
import {fetchWithCreds} from "../util";
import {evaVDPort} from "./evaVDPort";
import {VertretungsEva} from "../../../source/src/app/Classes";

const expect = chai.expect;

const schuelerCreds = {u: process.env.TEST_SCH_U, p: process.env.TEST_SCH_P};
const lehrerCreds = {u: process.env.TEST_SCH_U, p: process.env.TEST_SCH_P,
    l: {u: process.env.TEST_LEHRER_U, p: process.env.TEST_LEHRER_P}
};

describe('evaVD', function () {


    it('should pass schueler case 1', function () {
        let eva: VertretungsEva = evaVDPort(m.S.ONESLIDE, false);
        // File
        expect(eva[0]).to.be.equal("subst_001.htm");
        // info
        expect(eva[1][1].length).to.equal(0);
        // payload
        expect(eva[1][0].length).to.equal(3);

        console.log(JSON.stringify(eva[1][0][0], null, 2));
        eva[1][0].forEach(v => {
            v.cntnd.forEach(vv=>{
                expect(vv.date).to.equal("24.12.");
            });
        });

        expect(eva[1][0][0].stufe).to.equal("Stufe1");
        expect(eva[1][0][0].cntnd.length).to.equal(4);
            expect(eva[1][0][0].cntnd[0].type).to.equal("e");
            expect(eva[1][0][0].cntnd[0].fach).to.equal("Fach1");
            expect(eva[1][0][0].cntnd[0].oldRaum).to.equal("ARaum");
            expect(eva[1][0][0].cntnd[0].newRaum).to.equal("---");
            expect(eva[1][0][0].cntnd[0].info).to.equal("");
            expect(eva[1][0][0].cntnd[0].stunde).to.equal("3");
            expect(eva[1][0][0].cntnd[0].nd).not.to.exist;
        expect(eva[1][0][0].cntnd[1].type).to.equal("e");
        expect(eva[1][0][0].cntnd[1].fach).to.equal("Fach1");
        expect(eva[1][0][0].cntnd[1].oldRaum).to.equal("ARaum");
        expect(eva[1][0][0].cntnd[1].newRaum).to.equal("---");
        expect(eva[1][0][0].cntnd[1].info).to.equal("");
        expect(eva[1][0][0].cntnd[1].stunde).to.equal("3");
        expect(eva[1][0][0].cntnd[1].nd).to.exist;
            expect(eva[1][0][0].cntnd[2].type).to.equal("k");
            expect(eva[1][0][0].cntnd[2].fach).to.equal("");
            expect(eva[1][0][0].cntnd[2].oldRaum).to.equal("");
            expect(eva[1][0][0].cntnd[2].newRaum).to.equal("");
            expect(eva[1][0][0].cntnd[2].info).to.equal("GK-FACH1-SMBD");
            expect(eva[1][0][0].cntnd[2].stunde).to.equal("3");
            expect(eva[1][0][0].cntnd[2].nd).not.to.exist;
        expect(eva[1][0][0].cntnd[3].type).to.equal("k");
        expect(eva[1][0][0].cntnd[3].fach).to.equal("");
        expect(eva[1][0][0].cntnd[3].oldRaum).to.equal("");
        expect(eva[1][0][0].cntnd[3].newRaum).to.equal("");
        expect(eva[1][0][0].cntnd[3].info).to.equal("GK-FACH1-SMBD");
        expect(eva[1][0][0].cntnd[3].stunde).to.equal("3");
        expect(eva[1][0][0].cntnd[3].nd).to.exist;



        expect(eva[1][0][1].stufe).to.equal("Stufe2");
        expect(eva[1][0][1].cntnd.length).to.equal(37);


        expect(eva[1][0][2].stufe).to.equal("Pause");

        expect(eva[1][0][2].cntnd.length).to.equal(2);

    });


});