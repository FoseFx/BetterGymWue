import {getWoche, isDoppelStunde} from "./evakurse.netw";
import {getWocheTestCases, getWocheTestCasesResults} from "../../../testdata/evaKurse/getWoche.cases";
import {isDoppelStundeCases, isDoppelStundeCasesResults} from "../../../testdata/evaKurse/isDoppelStunde.cases";

describe("Evakurse.netw.ts", () => {

  describe("unit tests", () => {

    describe("getWoche", () => {
      it('should pass getWoche test case 1', function () {
        expect(getWoche(getWocheTestCases[0])).toBe(getWocheTestCasesResults[0])
      });
      it('should pass getWoche test case 2', function () {
        expect(getWoche(getWocheTestCases[1])).toBe(getWocheTestCasesResults[1])
      });
      it('should pass getWoche test case 3', function () {
        expect(getWoche(getWocheTestCases[2])).toBe(getWocheTestCasesResults[2])
      });
      it('should pass getWoche test case 4', function () {
        expect(getWoche(getWocheTestCases[3])).toBe(getWocheTestCasesResults[3])
      });
    });

    describe("isDoppelStunde", () => {

      it('should pass test case 1', function () {
        expect(isDoppelStunde(isDoppelStundeCases[0])).toBe(isDoppelStundeCasesResults[0]);
      });

      it('should pass test case 2', function () {
        expect(isDoppelStunde(isDoppelStundeCases[1])).toBe(isDoppelStundeCasesResults[1]);
      });

      it('should pass test case 3', function () {
        expect(isDoppelStunde(isDoppelStundeCases[2])).toBe(isDoppelStundeCasesResults[2]);
      });

      it('should pass test case 4', function () {
        expect(isDoppelStunde(isDoppelStundeCases[3])).toBe(isDoppelStundeCasesResults[3]);
      });

      it('should pass test case 5', function () {
        expect(isDoppelStunde(isDoppelStundeCases[4])).toBe(isDoppelStundeCasesResults[4]);
      });

    });

    describe("", () => {

    });
  })


});
