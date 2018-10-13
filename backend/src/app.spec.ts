
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

        /* TODO
        it('should fail on invalid credentials', async function () {
            const r = await Promise.all([
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("ü", " ü\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("ü", " ü\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/26/c/c00006.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("ü", "u\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("ü", "u\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Schueler/f1/subst_001.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("ü", "u\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("ü", "u\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer/f1/subst_002.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("a", "b"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("ü", "u\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("ü", "u\\$ß"),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("", ""),
                chai.request(app).get("/v2/http://gymnasium-wuerselen.de/untis/Lehrer-Stundenplan/38/t/t00013.htm").auth("", ""),
            ]);

            r.forEach((res, i)=>{
                console.log("[invalid creds]", i);
                console.log(i, res.error);
                expect(res.status).to.equal(401);
                expect(res.error).to.exist;
                expect(res.error).to.equal("Zugangsdaten sind falsch");
            })


        });
        */
        it('should fail on invalid route', async function () {
            const r = await Promise.all([
                chai.request(app).get("/v2/some_route/lol%20-2345.php").auth("test", "test"),
                chai.request(app).get("/ lol_").auth("test", "test"),
                chai.request(app).get("/").auth("test", "test")
            ]);
            r.forEach(function (res, i) {
                console.info("[invalid route]",i);
                expect(res.status).to.equal(400);
                expect(res.body.error).to.exist;
                expect(res.body.error).to.equal("Fehlerhafter Pfad");
            })
        });


    });


});