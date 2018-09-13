import {Injectable} from '@angular/core';
import {CONFIG} from '../../conf';
import {BaseService} from '../base/base.service';
import {AlertService} from '../alert.service';
import * as Cloud from './cloud.netw'
import * as Initial from './initial.netw'
import {getVertretungsDaten} from "./getVertretungsdaten";
import {VertretungsDaten, VertretungsEvaPayload, VertretungsReihe} from "../../Classes";

@Injectable()
export class NetwService {

  public _stufen: string[];
  public wochen: string[] = [];
  saveKurseTrys = 0;
  constructor(public baseService: BaseService, public alertService: AlertService) {}

  getSchulplanerInfo(date: string){
    date = date.replace(/\./g, "-");
    return new Promise((resolve, reject) => {
      this.baseService.makeConnections(CONFIG.databaseURL + "info/" + date + "/" + this.baseService.myStufe + ".json").subscribe((val) => {
        let val2 = (val != "null") ? JSON.parse(val) : [];
        this.baseService.makeConnections(CONFIG.databaseURL + "info/" + date + "/*.json").subscribe((valueAll) => {
          let valueAll2 = (valueAll == "null")? [] : JSON.parse(valueAll);
          resolve(val2.concat(valueAll2));
        });
      },
      (err) => {
        reject(err);
      });
    });
  }

  public compileVD(slides: VertretungsEvaPayload[], lehrer?:boolean) : VertretungsDaten{
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

  get stufen(){
    return new Promise((resolve, reject )=> {
      this._stufen = (localStorage.stufen) ? JSON.parse(localStorage.stufen) : undefined;

      if (this._stufen) resolve(this._stufen);
      let observable = this.baseService.makeConnections(CONFIG.credentialsCheckUrl);

      Initial.get_stufen(observable)
      .then((res:string[][])=>{
        let stufen = res[0];
        this.wochen = res[1];
        this._stufen = stufen;
        localStorage.stufen = JSON.stringify(stufen);
        resolve(stufen);
      })
      .catch( (msg:string) =>{
          this.alertService.alert(msg, this.alertService.DANGER);
          reject(msg);
      });

    });
  }

  public getkurse = (stufe: string, stufeid: number) => Initial.getkurse(stufe, stufeid, this.wochen, this.baseService)
  public getTT = (stufe) => Initial.getTT(stufe);
  public fetchCloud = (id: number)=> Cloud.fetchCloud(id, this);
  public saveKurse = (kurse) => Cloud.saveKurse(kurse, this);


  getVertretungsDaten(tag: string, i: number, urlmiddle?: string, file?: string[], sides?: any[]){
    return getVertretungsDaten(this, tag, i, urlmiddle, file, sides);
  }
}
function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
