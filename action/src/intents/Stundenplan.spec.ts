
import * as chai from 'chai';
import "mocha";
import {generateDateText} from "./Stundenplan";

const expect = chai.expect;







describe('generateDateText', function () {

    it('should work', function () {

        expect(generateDateText(new Date(2018, 9, 10, 5))).to.equal("10.10.2018");
        expect(generateDateText(new Date(2000, 11, 1))).to.equal("01.12.2000");
        expect(generateDateText(new Date(2000, 12, 1))).to.equal("01.01.2001");
        expect(generateDateText(new Date(2000, 4, 10))).to.equal("10.05.2000");


    });
});