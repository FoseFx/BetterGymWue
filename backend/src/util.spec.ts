
import * as chai from 'chai';
import "mocha";
import {fetchWithCreds} from "./util";

const expect = chai.expect;

describe('util', function () {

    describe('fetchWithCreds', function () {

        // notice: I cannot give you the Creds :P
        // Note: this is a live test!
        it('should fetch with correct creds', async function () {
            const res = await Promise.all([
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm", process.env.TEST_LEHRER_CREDS),
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_001.htm", process.env.TEST_LEHRER_CREDS),
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm", process.env.TEST_SCH_CREDS),
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/36/c/c00021.htm", process.env.TEST_SCH_CREDS),
            ]);

            res.forEach(function (r, i) {
                expect(r.ok).to.be.true;
                expect(r.content).to.exist;
                expect(r.content).to.contain("Gymnasium der Stadt W");
            })
        });

        // Note: this is a live test!
        it('should fail without correct creds', async function () {
            const res = await Promise.all([
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm", "SomeBS"),
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_001.htm", "Basic Some BS "),
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm", "Basic nope"),
                fetchWithCreds("http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/36/c/c00021.htm", "Basic SorryForTheSpam"),
            ]);

            res.forEach(function (r, i) {
                expect(r.ok).to.be.false;
                expect(r.content).not.to.exist;
            })
        });

        it('should fail without correct url', async function () {

            const res = await Promise.all([
                fetchWithCreds("http://gymnasium-wuerselen.de/", "SomeBS"),
                fetchWithCreds("http://gymnasium-wuers", "Basic Some BS "),
                fetchWithCreds("http://gymnasiumSchueler/f1/subst_001.htm", "Basic nope"),
                fetchWithCreds("http://google.com", "Basic SorryForTheSpam"),
            ]);

            res.forEach(function (r) {
                expect(r.ok).to.be.false;
                expect(r.content).not.to.exist;
            });
        });

    });
});