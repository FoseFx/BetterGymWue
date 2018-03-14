import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {BaseService} from '../../../s/base.service';
import {NetwService} from '../../../s/netw.service';
import * as $ from 'jquery';
@Component({
  selector: 'show-ttcontainer',
  templateUrl: './ttcontainer.component.html',
  styleUrls: ['./ttcontainer.component.css']
})
export class TtcontainerComponent implements AfterViewInit, OnInit{

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
    nd?: number
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

  constructor(public baseService: BaseService, private netwService: NetwService) { }

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
        that.displayArray[i] = {fach: sel.fach, raum: raum, lehrer: sel.lehrer};
      }
    });
  }

  checkVertretung(){
    this.baseService.milchglas = true;
    this.netwService.getVertretungsDaten(this.readableDate, this._index).then((w)=>{
      console.log(this.readableDate);
      console.log(w);
      let VD  = undefined;
      for (let Vobj in w[1]){
        if (Vobj == this.baseService.myStufe) VD = w[1][Vobj];
      }
      if (!VD) return;


      let VDT = [];
      VD.forEach((v) => {
        if (v.date === this.readableDate) VDT.push(v);
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
      } catch (e){console.log(e);}


      this.VDStufe = VDT;
      this.VDMe = relevant;
      this.baseService.milchglas = false;
    }).catch(() => {
      this.baseService.milchglas = false;
    });
  }
  unHTML(string:string):string{
    if(string.indexOf("<") != -1){
      return $(string).text()
    }else{
      return string;
    }
  }
  ngOnInit(){
    console.log(this.VDMe);
  }
  ngAfterViewInit(){
    this.netwService.getSchulplanerInfo(this.readableDate).then((value: string) => {
      console.log(value);
      this.info = this.info.concat(value);
    }).catch(() => {
      this.baseService.milchglas = false;
    });
    this.checkVertretung();
    console.log(this.getOnMyPos(0));
  }

  getOnMyPos(index){
    if(this.VDMe.length == 0) return {date: "", fach: "", info: "", newRaum: "", oldRaum: "", stufe: "", stunde:"", type: ""};
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
        console.log(this.isMyKlausur(me.info));
        if(this.isMyKlausur(me.info)) rel.push(me);
      }else{
        rel.push(me)
      }
    }});

    if(rel.length == 1) return rel[0];
    if(rel.length == 0) return {date: "", fach: "", info: "", newRaum: "", oldRaum: "", stufe: "", stunde:"", type: ""};
    rel.sort(function (a, b) {
      // K > E > V > R
      if( (a.type == "k" && (b.type == "e" || b.type == "v" || b.type == "r")) ||
        (a.type == "e" && (b.type == "v" || b.type == "r")) ||
        (a.type == "v" && b.type == "r")) return -1;
      else if (a.type == b.type)return 0;
      else return 1;
    });
    return rel[0];
  }
  isMyKlausur(info):boolean{
    let val = false;
    this.baseService.myKurse.forEach((kurs) => {
      if(info.indexOf(kurs.fach.toUpperCase()) != -1) val = true;
    });
    return val;
  }

}


function cmp(x, y) {
  return x > y ? 1 : (x < y ? -1 : 0);
}
