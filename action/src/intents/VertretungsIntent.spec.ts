
import * as chai from 'chai';
import "mocha";
import * as sinon from "sinon";
import * as sinonChai from 'sinon-chai';
import {unHTML, VertretungsIntent} from "./VertretungsIntent";
import * as getVD from "../backend-port/getVD";

chai.use(sinonChai);
const expect = chai.expect;

describe('VertretungsIntent', function () {
    let stub;

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

    describe('', function () {

    });

});

describe('unHTML', function () {

    it('should work', function () {

        expect(unHTML("<b>test1 </b>")).to.equal("test1");
        expect(unHTML("<b>test2 \n</b>")).to.equal("test2");
        expect(unHTML("  test3   ")).to.equal("test3");
        expect(unHTML(`<a href="https://www.lolxD.com">    test4 </a>`)).to.equal("test4");
        expect(unHTML(`<a href="https://www.lolxD.com">    This test might be  overkill, but hey!5678&%§§   </a>`))
            .to.equal("This test might be  overkill, but hey!5678&%§§");

    });

});