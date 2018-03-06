import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {BaseService} from '../../../s/base.service';
import {NetwService} from '../../../s/netw.service';

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
    nd?:number
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
    nd?:number
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
    this.netwService.getVertretungsDaten((this._index == 0) ? 'f1' : 'f2', this._index).then((w)=>{
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
      });
      this.info = Array.from(w[0][0]);
      this.VDStufe = VDT;
      this.VDMe = relevant;
      this.baseService.milchglas = false;
    }).catch(() => {
      this.baseService.milchglas = false;
    });
  }
  ngOnInit(){
    console.log(this.VDMe);
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
