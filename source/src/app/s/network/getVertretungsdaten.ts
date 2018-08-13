import {CONFIG} from "../../conf";
import {evaVD} from "./evavd";
import * as $ from "jquery";
import {NetwService} from "./netw.service";
import {VertretungsDaten, VertretungsEva, VertretungsEvaPayload} from "../../Classes";

let start = 'subst_001.htm';
export function getVertretungsDaten(  that: NetwService,
                                      tag: string,
                                      i: number,
                                      urlmiddle?: string,
                                      file?: string[],
                                      sides? : VertretungsEvaPayload[]
                                   ): Promise<VertretungsDaten> {
  urlmiddle = urlmiddle || 'f1';
  file = file || ['subst_001.htm', 'subst_001.htm'];
  sides = sides || [];
  if(!that.baseService.credentials.l || !that.baseService.preLehrer) return new Promise((resolve, reject) => {
    that.baseService.makeConnections(CONFIG.vertURL + urlmiddle + '/' + file[i]).subscribe(
      (wert) => {
        if($(wert).find(".mon_title").html().match(tag) === null){
          reject(urlmiddle);
        }
        let eva: VertretungsEva = evaVD(wert);
        file[i] = eva[0];
        sides.push(eva[1]);
        resolve([tag, i, urlmiddle, file, sides]);
      },
      (err) => {
        that.alertService.alert('Failure: ' + err.statusText, that.alertService.DANGER);
        reject('fail');
      },
    );
  })
    .then((t) => {
      let tag = t[0];
      let i = t[1];
      let urlmiddle = t[2];
      let file = t[3];
      let sides = t[4];
      if (file[i] == start) {
        return that.compileVD(sides);
      } else return that.getVertretungsDaten(tag, i, urlmiddle, file, sides);
    })
    .catch((err) => {
      if(err != 'fail'){
        if(err != 'f2') return that.getVertretungsDaten(tag, i, 'f2');
        else return new Promise((resolve, reject) => {reject('loop')});
      }else{
        return new Promise((resolve, reject) => {reject()});
      }
    });
  else
    return new Promise((resolve, reject) => {
      that.baseService.makeConnections(CONFIG.lehrerURL + urlmiddle + '/' + file[i], true).subscribe(
        (wert) => {
          if($(wert).find(".mon_title").html().match(tag) === null) reject(urlmiddle);
          let eva = evaVD(wert, true);
          file[i] = eva[0];
          sides.push(eva[1]);
          resolve([tag, i, urlmiddle, file, sides]);
        },
        (err) => {
          that.alertService.alert('Failure: ' + err.statusText, that.alertService.DANGER);
          reject('fail');
        }
      );
    })
      .then((t) => {
        let tag = t[0];
        let i = t[1];
        let urlmiddle = t[2];
        let file = t[3];
        let sides = t[4];
        if(file[i] == start){
          return that.compileVD(sides, true);
        }else{
          return that.getVertretungsDaten(tag, i, urlmiddle, file, sides);
        }
      })
      .catch((err) => {
        if(err != 'fail'){
          console.log("rej " + err);
          if(err != 'f2') return that.getVertretungsDaten(tag, i, 'f2');
          else return new Promise((resolve, reject) => {reject('loop')});
        }else{
          that.baseService.milchglas = false;
          return new Promise((resolve, reject) => {reject()});
        }
      });
}
