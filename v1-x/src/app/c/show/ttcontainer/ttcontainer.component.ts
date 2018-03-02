import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {BaseService} from '../../../s/base.service';
import {NetwService} from '../../../s/netw.service';

@Component({
  selector: 'show-ttcontainer',
  templateUrl: './ttcontainer.component.html',
  styleUrls: ['./ttcontainer.component.css']
})
export class TtcontainerComponent implements AfterViewInit{

  info = [];
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
    vert?: string
  }[] = [];
  VDStufe: {
    date: string,
    fach: string,
    info: string,
    newRaum: string,
    oldRaum: string,
    stufe: string,
    stunde:string,
    type: string
  }[] = [];
  VDMe: {
    date: string,
    fach: string,
    info: string,
    newRaum: string,
    oldRaum: string,
    stufe: string,
    stunde:string,
    type: string
  }[] = [];
  readableDate;


  @Input() set tt(val){
    this._tt = val;
    this.filterVisible();
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
    this.netwService.getVertretungsDaten((this._index == 0) ? 'f1' : 'f2', this._index).then((w)=>{
      let VD  = undefined;
      for (let Vobj in w[1]){
        if (Vobj == this.baseService.myStufe) VD = w[1][Vobj];
      }
      console.log(VD);
      if (!VD) return;
      if (!VD[0]) return;
      if (VD[0].date != this.readableDate) return;

      let relevant = [];
      VD.forEach((row) => {
        this.baseService.myKurse.forEach(function (val) {
          if (val.fach == row.fach) relevant.push(row);
        });
        this.baseService.KlassenKurse.forEach(function (val) {
          if (val == row.fach) relevant.push(row);
        });
      });
      console.log(relevant);
      this.info = w[0];
      this.VDStufe = VD;
      this.VDMe = relevant;

    });
  }
  ngAfterViewInit(){
    this.checkVertretung();
  }

  getOnMyPos(index){
    let rel = {
      date: "",
      fach: "",
      info: "",
      newRaum: "",
      oldRaum: "",
      stufe: "",
      stunde:"",
      type: ""
    };
    this.VDMe.forEach((me) => { if (me.stunde == index + 1) rel = me; });
    return rel;
  }
}
