import {Kurs} from "../../../../../Classes";
import {evaVertretung} from "./evaVertretung";
import {evaVertretungTestData} from "../../../../../testdata/show/tt/evaVertretung.testdata";
import {} from 'jasmine';

function testCases(values: any[], func: (value: any) => void) {
  for (let i = 0, count = values.length; i < count; i++) {
    func.apply(this, [values[i]]);
  }
}


export class MockTTContainer{
  // @ts-ignore
  baseService: {
    myStufe: string,
    myKurse: Kurs[],
    KlassenKurse: string[]
  } = {};
  readableDate: string;
  info: string[];
  constructor(date: string, info: string[], stufe: string, kurse: Kurs[], klassenkurse: string[]){
    this.readableDate = date;
    this.info = info;
    this.baseService.KlassenKurse = klassenkurse;
    this.baseService.myKurse = kurse;
    this.baseService.myStufe = stufe;
  }
  VDStufe = [];
  VDMe = [];
  addVDtoDisplayArray = () => null;
}
//                              w    date    info         kurse       KlassenKurse VDMe
export type evaVertTestData = [any, [string, string[], string, Kurs[], string[]], any[]];

describe("show: ttcontainer: evaVertretung", () => {

  // for legal reasons I cannot give you the testing data
  let data: evaVertTestData[] = evaVertretungTestData;


  beforeEach(() => {

  });

  testCases(data, (value: evaVertTestData) => {
    it("Should produce expected output", (done) => {
      let component = new MockTTContainer(value[1][0], value[1][1], value[1][2], value[1][3], value[1][4]);
      // @ts-ignore
      evaVertretung(value[0], component);
      expect(component.VDMe).toEqual(value[2]);
      done();
    });

  })


});
