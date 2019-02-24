import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../../../conf";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

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
          delete localStorage.stundnplanHash;
          delete localStorage.notUsedNotKurse;
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
    let up;
    baseService.httpClient.get(CONFIG.versionURL).subscribe(
      (res: {version: string, news: string[]}) =>{
        if(!res.version.match(baseService.VERSION)) up = true;
        if(up)
          resolve(res.news);
        else
          reject();
      }
    );
  })
}



export function getResetHeader(baseService: BaseService): Observable<string> {
  return <Observable<string>>baseService.httpClient.get(CONFIG.resetHeader);
}

export function getResetMessage(baseService: BaseService): Observable<string> {
  return <Observable<string>>baseService.httpClient.get(CONFIG.resetMsg);
}
