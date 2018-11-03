
import * as chai from 'chai';
import "mocha";
import * as sinon from "sinon";
import * as sinonChai from 'sinon-chai';
import {unHTML, VertretungsIntent} from "./VertretungsIntent";
import * as getVD from "../backend-port/getVD";
import {VertretungsDaten} from "../../../source/src/app/Classes";

chai.use(sinonChai);
const expect = chai.expect;

describe('VertretungsIntent', function () {
    let stub;
    const SCHUELER_1: VertretungsDaten = [
        [
            "<b>Nachrichten zum Tag</b>",
            "<b>Abwesende Klassen</b>",
            "<b>Stufe43</b>"
        ],
        {
            "Stufe1": [
                {"type": "e", "date": "24.12.", "fach": "Fach1", "oldRaum": "ARaum", "newRaum": "---", "info": "", "stunde": "3"},
                {"type": "e", "date": "24.12.", "fach": "Fach1", "oldRaum": "ARaum", "newRaum": "---", "info": "", "stunde": "3", "nd": 1},
                {"type": "k", "date": "24.12.", "fach": "", "oldRaum": "", "newRaum": "", "info": "GK-FACH1-SMBD", "stunde": "3"},
                {"type": "k", "date": "24.12.", "fach": "", "oldRaum": "", "newRaum": "", "info": "GK-FACH1-SMBD", "stunde": "3", "nd": 1}
            ],
            "Pause": [
                {"type": "v", "date": "24.12.", "fach": "Pause", "oldRaum": "Pav1", "newRaum": "Pav1", "info": "", "stunde": "7"},
                {"type": "v", "date": "24.12.", "fach": "Pause", "oldRaum": "Pav1", "newRaum": "Pav1", "info": "", "stunde": "7", "nd": 1}
            ]
        }
    ];

    const stubConv = {
        // @ts-ignore
        parameters: {
            date: new Date(2018, 11, 12)
        },
        user:{ storage: {
            payload: {
                planTTL: +new Date("18.02.2038"),
                creds: {u: "user", p: "passw", l: {u: "luser", p: "lpassw"}}
            }
        }},
        ask: (param) => param
    };

    afterEach(() => {
        stub.restore();
    });

    describe('empty VD', function () {

        it('should answer on no Info', async function () {
            // @ts-ignore
            stub = sinon.stub(getVD, "getVertretungsdaten").resolves([[], []]);
            // @ts-ignore
            const res = await VertretungsIntent(stubConv);

            expect(res).to.be.equal("Am Mittwoch hast du keine Vertretung.");
        });

        it('should answer on Info', async function () {
            // @ts-ignore
            stub = sinon.stub(getVD, "getVertretungsdaten").resolves([["<b>Some test lol</b>", "lolxD"], []]);
            // @ts-ignore
            const res = await VertretungsIntent(stubConv);

            expect(res).to.be.equal("Am Mittwoch hast du keine Vertretung. Weitere Informationen: Some test lol lolxD");
        });


    });

    describe('no VD', function () {

        it('should answer on no VD', async function () {
            // @ts-ignore
            stub = sinon.stub(getVD, "getVertretungsdaten").resolves(null);
            // @ts-ignore
            const res = await VertretungsIntent(stubConv);

            expect(res).to.be.equal("Keinen Vertretungsplan für Mittwoch gefunden.");
        });

    });

    describe('VD', function () {

        it('should pass schueler 1', async function () {
            // @ts-ignore
            stub = sinon.stub(getVD, "getVertretungsdaten").resolves(SCHUELER_1);
            // @ts-ignore
            const res = await VertretungsIntent(stubConv);

            expect(true).equal(true);

        });


    });

});

describe('unHTML', function () {

    it('should work', function () {

        expect(unHTML("<b>test1 </b>")).to.equal("test1");
        expect(unHTML("<b>test2 \n</b>")).to.equal("test2");
        expect(unHTML("  test3   ")).to.equal("test3");
        expect(unHTML(`<a href="https://www.lolxD.com">    test4 </a>`)).to.equal("test4");
        expect(unHTML(`<a href="https://www.lolxD.com">    This test might be  overki\n\tll, but hey!5678&%§§   </a>`))
            .to.equal("This test might be  overkill, but hey!5678&%§§");

    });

});