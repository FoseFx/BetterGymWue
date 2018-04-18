import {Component, Input, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {BaseService} from '../../../s/base.service';
import {NetwService} from '../../../s/netw.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx'
import {ngAppResolve} from '@angular/cli/models/webpack-configs';
import {Subscription} from 'rxjs/Subscription';
import {ShowComponent} from '../show.component';

@Component({
  selector: 'show-ttcontainer',
  templateUrl: './ttcontainer.component.html',
  styleUrls: ['./ttcontainer.component.css']
})
export class TtcontainerComponent implements AfterViewInit{

  info: string[] = [];
  _tt: {
    date: Date,
    tag: {
      type: string,
      fach: string,
      lehrer?: string,
      raeume?: {kurs: string, raum: string}[],
      raum?: string
    }[];
  };
  displayArray: {
    fach: string,
    lehrer: string,
    raum: string,
    vert?: string,
    nd?: number,
    isFreistunde?: boolean
  }[] = [];
  VDStufe: {
    date: string,
    fach: string,
    info: string,
    newRaum: string,
    oldRaum: string,
    stufe: string,
    stunde:string,
    type: string,
    nd?:number,
    lehrer?:string
  }[] = [];
  VDMe: {
    date: string,
    fach: string,
    info: string,
    newRaum: string,
    oldRaum: string,
    stufe: string,
    stunde:string,
    type: string,
    nd?:number,
    lehrer?:string
  }[] = [];
  readableDate;
  tag = "";
  setted = false;
  online: Observable<boolean>;
  offlineDate:Date;
  offlinepreLehrer = false;

  @Input() set tt(val){
    if(this.setted) return;
    this.setted = true;
    this._tt = val;
    this.filterVisible();
    this.tag = ["Mo", "Di", "Mi", "Do", "Fr"][this._tt.date.getDay() - 1 ];
    this.readableDate = this._tt.date.getDate() + "." + (this._tt.date.getMonth() + 1) + ".";
  }
  _index;
  @Input() set index(val){
    this._index = val;
  }
  onlineSub: Subscription;

  constructor(public baseService: BaseService, private netwService: NetwService, private router:Router, private ref: ChangeDetectorRef) {
    this.online = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    )
  }

  filterVisible(){
    let that = this;
    this._tt.tag.forEach(function (stunde, i) {
      if (stunde.type === "klasse") that.displayArray[i] =
        {fach: stunde.fach, lehrer: stunde.lehrer, raum: stunde.raum};
      else if (stunde.type === "kurs"){
        let sel: {fach, title, lehrer} = undefined;
        that.baseService.myKurse.forEach((kurs) => { if (kurs.title ==  stunde.fach) sel = kurs; });
        if (!sel) return;
        let raum = "---";
        stunde.raeume.forEach((r) => { if (r.kurs == sel.fach) raum = r.raum; });
        that.displayArray[i] = {fach: sel.fach, raum: raum, lehrer: sel.lehrer, isFreistunde: (raum == '---')};
      }
    });
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

  evaVertretung(w){
    let VD  = undefined;
    for (let Vobj in w[1]){
      if (Vobj == this.baseService.myStufe) VD = w[1][Vobj];
    }
    if (!VD) return;
    let VDT = [];
    VD.forEach((v) => {
      if (v.date === this.readableDate) {
        if(v.fach == "---" && v.lehrer == "-----" && v.info.replace(" ", "") == "") return;
        else VDT.push(v);
      }
    });
    let relevant = [];
    VDT.forEach((row) => {
      //console.log(row);
      if (row.date != this.readableDate) return;
      this.baseService.myKurse.forEach((val) => {
        if (val.fach == row.fach) relevant.push(row);
      });
      this.baseService.KlassenKurse.forEach((val) => {
        if (val == row.fach) relevant.push(row);
      });
      try{if(/^\s+$/.test(row.fach)) relevant.push(row);} catch (e){}
      if(row.fach == undefined) relevant.push(row);
    });

    VDT.sort(function (a, b) {
      return cmp(a.stunde[0], b.stunde[0]) || cmp(a.kurs, b.kurs) ||cmp(a.type, b.type);
    });


    try{
      this.info = this.info.concat(Array.from(w[0][0]));
    } catch (e){console.log(e.message);}

    this.VDStufe = VDT;
    this.VDMe = relevant;
  }

  unHTML(string:string):string{
    if(string.indexOf("<") != -1){
      return $(string).text()
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
        delete localStorage.lastVD;
        this.netwService.getSchulplanerInfo(this.readableDate).then((value: string[]) => {
          this.offlineDate = undefined;
          value.forEach((v, i, a) => {value[i] += 'SCHULPLANER_INFO'});
          console.log(value);
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
    this.offlinepreLehrer = lastVD.lehrer;
    this.evaVertretung(lastVD.w[this._index]);
  }

  myPos = [];

  getOnMyPos(index){
    if(this.VDMe.length == 0) return {date: "", fach: "", info: "", newRaum: "", oldRaum: "", stufe: "", stunde:"", type: ""};
    if(this.myPos[index]) return this.myPos[index];
    let rel: {
      date: string,
      fach: string,
      info: string,
      newRaum: string,
      oldRaum: string,
      stufe: string,
      stunde:string,
      type: string
    }[] = [];
    this.VDMe.forEach((me) => { if (me.stunde == (index + 1) && !me.nd) {
      if(me.type.toLowerCase() == 'k'){
        if(this.isMyKlausur(me.info)) rel.push(me);
      }else{
        rel.push(me)
      }
    }});
    const fallback = {date: "", fach: "", info: "", newRaum: "", oldRaum: "", stufe: "", stunde:"", type: ""};

    if(rel.length == 1) {
      if (rel[0].type !== 'k' && rel[0].type !== 'e' && rel[0].type !== 'v' && rel[0].type !== 'r') {
        return fallback;
      }
      this.myPos[index] = rel[0];
      return rel[0];
    }
    if(rel.length == 0) return fallback;
    rel.sort(function (a, b) {
      // K > E > V > R
      if( (a.type == "k" && (b.type == "e" || b.type == "v" || b.type == "r")) ||
        (a.type == "e" && (b.type == "v" || b.type == "r")) ||
        (a.type == "v" && b.type == "r")) return -1;
      else if (a.type == b.type)return 0;
      else return 1;
    });
    if (rel[0].type !== 'k' && rel[0].type !== 'e' && rel[0].type !== 'v' && rel[0].type !== 'r') {
      return fallback;
    }
    this.myPos[index] = rel[0];
    return rel[0];
  }

  isMyKlausur(info):boolean{
    let val = false;
    this.baseService.myKurse.forEach((kurs) => {
      if(info.indexOf(kurs.fach.toUpperCase()) != -1) val = true;
    });
    return val;
  }

  set preLehrer(val:boolean){
    this.baseService.preLehrer = val;
    setTimeout(() => {this.router.navigate(['/']);}, 20);
  }

  get preLehrer(){return this.baseService.preLehrer}

}

function cmp(x, y) {
  return x > y ? 1 : (x < y ? -1 : 0);
}
