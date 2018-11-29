import { Injectable } from '@angular/core';
import {NetwService} from './network/netw.service';
import {BaseService} from './base/base.service';

@Injectable()
export class RefreshttService {

  constructor(private baseService: BaseService, private netwService: NetwService){}

  removeKurse(){
    this.baseService.myKurse = undefined;
    delete localStorage.myKurse;
    this.baseService.kursID = undefined;
    delete localStorage.kursID;
    this.baseService.verifiedNonKurse = false;
    delete localStorage.verifiedNonKurse;
    delete localStorage.notUsedNotKurse;
  }

  removeTT(){
    this.baseService.milchglas = true;
    this.baseService.TT = undefined;
    delete localStorage.TT;
    this.baseService.verifiedNonKurse = false;
    delete localStorage.notUsedNotKurse;
  }

  fails = 0;
  refreshTT(){
    this.removeTT();
    let oldKurse = this.baseService.KlassenKurse.concat(this.baseService.myKurse.map(v=>v.fach));
    oldKurse.sort();

    let newKurse = [];
    return new Promise((resolve, reject) => {

      this.netwService.stufen.then(() => {

        console.log("calle getkurse");

        this.netwService.getkurse(this.baseService.myStufe, this.baseService.myStufeID).then((val) => {

          console.log(val);
          val.forEach((v) => {
            let drin = false;
            this.baseService.myKurse.forEach((aktuell) => {
              if(aktuell.fach == v.fach) drin = true;
            });
            if(drin) newKurse.push(v.fach)
          });
          this.baseService.setTT(this.netwService.getTT(this.baseService.myStufe));
          newKurse.concat(this.baseService.KlassenKurse);
          newKurse.sort();
          let allesgut = true;
          newKurse.forEach((v, i) => {if(v != oldKurse[i])allesgut = false;});
          if (!allesgut){
            this.removeKurse();
            this.baseService.KlassenKurse = undefined;
            delete localStorage.KlassenKurse;
            this.removeTT();
          }
          this.baseService.milchglas = false;
          console.log(oldKurse);
          console.log(newKurse);
          resolve();

        }).catch((val)=> {console.log(val); setTimeout(() => {this.fails++; if(this.fails > 2)reject();else resolve(this.refreshTT())}, 500)});

      }).catch(val=>{console.log(val);})


    });







  }

}
