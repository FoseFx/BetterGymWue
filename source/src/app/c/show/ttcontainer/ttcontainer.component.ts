
import {fromEvent as observableFromEvent, of as observableOf, merge as observableMerge, Subscription} from 'rxjs';

import {mapTo} from 'rxjs/operators';
import {Component, Input, AfterViewInit} from '@angular/core';
import {BaseService} from '../../../s/base/base.service';
import {NetwService} from '../../../s/network/netw.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DisplayArray, TimeTable, VertretungsReihe} from "../../../Classes";
import {evaVertretung} from "./util/evaVertretung";
import {addVDtoDisplayArray} from "./util/addVDtoDisplayArray";

@Component({
  selector: 'show-ttcontainer',
  templateUrl: './ttcontainer.component.html',
  styleUrls: ['./ttcontainer.component.css']
})
export class TtcontainerComponent implements AfterViewInit{

  info: string[] = [];
  _tt: TimeTable;
  displayArray: DisplayArray = [];
  VDStufe: VertretungsReihe[] = [];
  VDMe: VertretungsReihe[] = [];
  readableDate: string;
  setted = false;
  online: Observable<boolean>;
  offlineDate:Date;
  offlinepreLehrer = false;
  backUpVdSet = false;
  domParser = new DOMParser();

  @Input() set tt(val: TimeTable){
    if(this.setted) return;
    this.setted = true;
    this._tt = val;
    this.filterVisible();
    this.readableDate = this._tt.date.getDate() + "." + (this._tt.date.getMonth() + 1) + ".";
  }
  _index: number;
  @Input() set index(val: number){
    this._index = val;
  }
  onlineSub: Subscription;

  constructor(public baseService: BaseService, private netwService: NetwService, private router:Router) {
    this.online = observableMerge(
      observableOf(navigator.onLine),
      observableFromEvent(window, 'online').pipe(mapTo(true)),
      observableFromEvent(window, 'offline').pipe(mapTo(false))
    );
  }

  filterVisible(){
    let that = this;
    this._tt.tag.forEach(function (stunde, i) {
      if (stunde.type === "klasse")
        that.displayArray[i] = {fach: stunde.fach, lehrer: stunde.lehrer, raum: stunde.raum};
      else if (stunde.type === "kurs"){
        let sel: {fach, title, lehrer} = undefined;
        that.baseService.myKurse.forEach((kurs) => { if (kurs.title ==  stunde.fach) sel = kurs; });
        if (!sel) return;
        let raum = "---";
        stunde.raeume.forEach((r) => { if (r.kurs == sel.fach) raum = r.raum; });
        that.displayArray[i] = {fach: sel.fach, raum: raum, lehrer: sel.lehrer, isFreistunde: (raum == '---')};
      }
    });
    // @ts-ignore
    this.displayArray.forEach(function (e) { e.VD = {}; });

    console.log('displayArray', this.displayArray);
  }

  checkVertretung(){
    this.baseService.milchglas = true;
    this.netwService.getVertretungsDaten(this.readableDate, this._index).then((w)=>{
      this.evaVertretung(w);
      this.baseService.setLastVD(this._index, w, this.baseService.preLehrer);
      this.baseService.milchglas = false;
    }).catch(() => {
      this.baseService.milchglas = false;
    });
  }

  evaVertretung = (w) => evaVertretung(w, this);
  addVDtoDisplayArray = () => addVDtoDisplayArray(this.VDMe, this.displayArray, this);

  unHTML(string:string):string{
    if(string.indexOf("<") != -1){
      return this.domParser.parseFromString(string,"text/html").getElementsByTagName('html')[0].textContent.trim();
    }else{
      return string;
    }
  }

  reload(){
    this.onlineSub.unsubscribe();
    this.ngAfterViewInit();
  }

  ngAfterViewInit(){
    this.onlineSub = this.online.subscribe(
      (on) => {
        this.info = [];
        if(!on) {
          this.getVDfromCache();
          return;
        }

        this.netwService.getSchulplanerInfo(this.readableDate).then((value: string[]) => {
          //this.offlineDate = undefined;
          value.forEach((v, i) => {value[i] += 'SCHULPLANER_INFO'});
          this.info = this.info.concat(value);
        });
        this.checkVertretung();
      }
    );
  }

  getVDfromCache(){
    this.VDStufe = [];
    this.VDMe = [];
    if(!localStorage.lastVD) return;
    let lastVD = JSON.parse(localStorage.lastVD);
    this.offlineDate = new Date(lastVD.d);
    if(!lastVD.w[this._index]) return;
    this.backUpVdSet = true;
    this.offlinepreLehrer = lastVD.lehrer;
    this.evaVertretung(lastVD.w[this._index]);
  }

  set preLehrer(val:boolean){
    this.baseService.preLehrer = val;
    setTimeout(() => {this.router.navigate(['/']);}, 20);
  }

  get preLehrer(){return this.baseService.preLehrer}

  woche(idk){return (+idk%2 == 0)? 'A':'B';}

}
