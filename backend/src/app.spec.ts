
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import "mocha";
import app from "./app";
chai.use(chaiHttp);

const expect = chai.expect;

describe('App', function () {

    describe('Failures', function () {
        
        it('should fail on no credentials', async function () {
            const r = await chai.request(app).get("/v2/http://www.gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm");
            expect(r.status).to.equal(401);
            expect(r.body.error).to.exist;
            expect(r.body.error).to.equal("Keine Zugangsdaten angegeben");
        });

        // Note: this is a live test!
        it('should fail on invalid credentials', async function () {
            const a0 = chai.request(app);
            const a1 = chai.request(app);
            const a2 = chai.request(app);
            const r = await Promise.all([
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

            r.forEach((res:any, i:number)=>{
                expect(res.status).to.equal(401);
                expect(res.body.error).to.exist;
                expect(res.body.error).to.equal("Zugangsdaten sind falsch");
            })


        });

        it('should fail on invalid route', async function () {
            const r = await Promise.all([
                chai.request(app).get("/v2/some_route/lol%20-2345.php").auth("test", "test"),
                chai.request(app).get("/ lol_").auth("test", "test"),
                chai.request(app).get("/").auth("test", "test")
            ]);
            r.forEach(function (res, i) {
                expect(res.status).to.equal(400);
                expect(res.body.error).to.exist;
                expect(res.body.error).to.equal("Fehlerhafter Pfad");
            })
        });

    });

    describe('Formals', function () {

        it('should respond with correct headers', async function () {
            const r = await Promise.all([
                chai.request(app).get("/v2/http://www.gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                chai.request(app).get("/v2/some_route/lol%20-2345.php").auth("test", "test"),
                chai.request(app).options("/v2/http://www.gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm"),
                chai.request(app).options("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                chai.request(app).options("/v2/some_route/lol%20-2345.php").auth("test", "test")
            ]);

            r.forEach(function (res, i) {
                expect(res.header["access-control-allow-origin"]).to.be.equal("*");
                expect(res.header["access-control-allow-headers"]).to.be.equal("authorization");
                expect(res.header["access-control-allow-methods"]).to.contain("OPTIONS").and.to.contain("GET");
            });
        });

    });

    // Note: This is a live test!
    describe('Correct requests', function () {

        it('should answer with content requested', async function () {
            const a = chai.request(app);
            const r = await Promise.all([
                a.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").set("Authorization",process.env.TEST_SCH_CREDS),
                a.get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").set("Authorization",process.env.TEST_SCH_CREDS),
                a.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_001.htm").set("Authorization",process.env.TEST_LEHRER_CREDS),
                a.get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00001.htm").set("Authorization",process.env.TEST_LEHRER_CREDS),
            ]);

            const expects: RegExp[] = [
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