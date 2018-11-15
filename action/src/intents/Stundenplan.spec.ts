
import * as chai from 'chai';
import "mocha";
import * as sinon from "sinon";
import * as sinonChai from 'sinon-chai';
import {generateDateText, StundenPlanIntent} from "./Stundenplan";
import {log} from "util";

chai.use(sinonChai);
const expect = chai.expect;


describe('StundenplanIntent', function () {

    let fakeConv;
    let clock;

    describe('day', function () {

        beforeEach(() => {

            fakeConv = {
                parameters: {
                    date: new Date(2018, 11, 12)
                },
                user:{ storage: {
                        payload: {
                            planTTL: +new Date("18.02.2038"),
                            creds: {u: "user", p: "passw", l: {u: "luser", p: "lpassw"}},
                            plan: [[[], [], [], [], []], [[], [], [], [], [], []]]
                        }
                    }},
                ask: (param) => param
            };


        });

        it('should respond on same day', function () {
            clock = sinon.useFakeTimers(fakeConv.parameters.date); // Mittwoch
            delete fakeConv.parameters.date;
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak> Heute hast du .</speak>","displayText":"Stundenplan - 12.12.2018: \n"});
        });

        it('should respond on same day', function () {
            clock = sinon.useFakeTimers(fakeConv.parameters.date); // Mittwoch
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak> Heute hast du .</speak>","displayText":"Stundenplan - 12.12.2018: \n"});
        });

        it('should respond on next day', function () {
            const date = new Date(fakeConv.parameters.date);
            date.setDate(date.getDate() - 1);                      // Dienstag
            clock = sinon.useFakeTimers(date);
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak> Morgen hast du .</speak>","displayText":"Stundenplan - 12.12.2018: \n"});
        });

        it('should respond on the day after the next day', function () {
            const date = new Date(fakeConv.parameters.date);
            date.setDate(date.getDate() - 2);                      // Montag
            clock = sinon.useFakeTimers(date);
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak> Übermorgen hast du .</speak>","displayText":"Stundenplan - 12.12.2018: \n"});
        });


        it('should respond on saturdays', function () {
            clock = sinon.useFakeTimers(new Date(2018, 11, 15));
            delete fakeConv.parameters.date;
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak>Da ist Wochenende, aber Übermorgen hast du .</speak>","displayText":"Stundenplan - 17.12.2018: \n"});
            fakeConv.parameters.date = new Date(2018, 11, 17);
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak> Übermorgen hast du .</speak>","displayText":"Stundenplan - 17.12.2018: \n"});
        });

        it('should respond on sundays', function () {
            clock = sinon.useFakeTimers(new Date(2018, 11, 16));
            delete fakeConv.parameters.date;
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak>Da ist Wochenende, aber Morgen hast du .</speak>","displayText":"Stundenplan - 17.12.2018: \n"});
            fakeConv.parameters.date = new Date(2018, 11, 17);
            expect(StundenPlanIntent(fakeConv)).to.deep.equal({"textToSpeech":"<speak> Morgen hast du .</speak>","displayText":"Stundenplan - 17.12.2018: \n"});
        });

        it('should not return in the past', function () {
            fakeConv.parameters.date = new Date(0); // Donnerstag
            expect(StundenPlanIntent(fakeConv)).to.equal("Leider kann ich nicht in die Vergangenheit reisen.");
        });

        it('should not return in the past on weekends', function () {
            fakeConv.parameters.date = new Date(1970, 0, 3); // Samstag
            expect(StundenPlanIntent(fakeConv)).to.equal("Leider kann ich nicht in die Vergangenheit reisen.");
            fakeConv.parameters.date = new Date(1970, 0, 4); // Sonntag
            expect(StundenPlanIntent(fakeConv)).to.equal("Leider kann ich nicht in die Vergangenheit reisen.");
        });


        afterEach(() => {
            try{
                clock.restore();
            }catch (e) {}
        });

    });





});



describe('generateDateText', function () {

    it('should work', function () {

        expect(generateDateText(new Date(2018, 9, 10, 5))).to.equal("10.10.2018");
        expect(generateDateText(new Date(2000, 11, 1))).to.equal("01.12.2000");
        expect(generateDateText(new Date(2000, 12, 1))).to.equal("01.01.2001");
        expect(generateDateText(new Date(2000, 4, 10))).to.equal("10.05.2000");


    });
});