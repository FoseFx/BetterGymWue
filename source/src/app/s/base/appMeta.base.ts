import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../../conf";
import {BaseService} from "./base.service";

export function needsReset(httpClient: HttpClient) {
  httpClient.get(CONFIG.resets).subscribe(
    (resets:number)=>{
      if(!localStorage.resets) localStorage.resets = resets;
      else {
        if(+localStorage.resets < resets){
          localStorage.resets = resets;
          localStorage.justResetted = true;
          delete localStorage.stufen;
          delete localStorage.myStufeID;
          delete localStorage.myStufe;
          delete localStorage.myKurse;
          delete localStorage.kursID;
          delete localStorage.TT;
          delete localStorage.KlassenKurse;
          location.reload();
        }
      }
    },
    (err)=>{
      console.error('needsReset',err);
    }
  )
}

export function checkFerien(baseService: BaseService){
  baseService.httpClient.get(CONFIG.ferienUrl).subscribe(
    (bool:boolean) => {
      baseService.ferien = bool;
      if(baseService.ferien){
        baseService.httpClient.get(CONFIG.ferienEndsUrl).subscribe(
          (ends:string) => {
            baseService.ferienEndsOn = ends;
          },
          (e) =>{
            console.error('getFerienEndError', e);
          }
        );
      }
    },
    (e) =>{
      console.error('checkFerienError', e);
    }
  );
}

export function needsUpdate(baseService: BaseService): Promise<string[]> {
  if (!baseService.deadTested){
    baseService.httpClient.get(CONFIG.databaseURL + 'killswitch.json').subscribe((isdead:boolean) => {
      baseService.dead = isdead;
      console.log('dead? ', isdead);
      localStorage.dead = isdead;
      if(isdead) baseService.router.navigate(['/error'], {queryParams: {'dead': true}})})
  }
  return new Promise((resolve, reject) => {
    let upDATE;
    let msg;
    let up;
    baseService.httpClient.get("https://api.github.com/repos/FoseFx/BetterGymWue/branches/master").subscribe(
      (branch: {commit}) =>{
        let c = branch.commit;
        upDATE = c.commit.author.date;
        msg = c.commit.message;
        if(!msg.match(baseService.VERSION)) up = true;
        if(up)
          resolve([upDATE, msg]);
        else
          reject();
      }
    );
  })
}
