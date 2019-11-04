import {Injectable} from '@angular/core';
import {BaseService} from '../base/base.service';
import {AlertService} from '../alert.service';
import {VertretungsDaten, VertretungsEvaPayload, VertretungsReihe} from "../../../Classes";

@Injectable()
export class NetwService {

  saveKurseTrys = 0;
  constructor(public baseService: BaseService, public alertService: AlertService) {}
  public compileVD(slides: VertretungsEvaPayload[], lehrer?:boolean): VertretungsDaten{
    lehrer = lehrer || false;
    let compr = {};
    let info = [];
    slides.forEach((a) => {
      a[0].forEach((t) => {
        let arr: VertretungsReihe[] = [];
        t.cntnd.forEach((r) => {
          let arrObj: VertretungsReihe = {
            stufe: decodeHtml( lehrer? r.stufe: t.stufe ),
            date: decodeHtml(r.date),
            fach: decodeHtml(r.fach),
            oldRaum: decodeHtml(r.oldRaum),
            newRaum: decodeHtml(r.newRaum),
            info: decodeHtml(r.info),
            stunde: decodeHtml(r.stunde),
            type: decodeHtml(r.type),
            nd: r.nd
          };
          if(lehrer) arrObj.lehrer = decodeHtml(t.stufe);
          arr.push(arrObj);
        });
        arr.forEach((arrE) => {
          if (compr[arrE.stufe])
            compr[arrE.stufe].push(arrE);
          else
            compr[arrE.stufe] = [arrE];

        });
      });
      if (a[1][0]) info.push(a[1]);
    });
    // sort
    for (let stufe in compr){
      compr[stufe].sort(function (a, b) {
        if (a.stunde > b.stufe) return 1;
        if (a.stufe < b.stufe) return -1;
        else return 0;
      });
    }

    return [info, compr];
  }


}
function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
