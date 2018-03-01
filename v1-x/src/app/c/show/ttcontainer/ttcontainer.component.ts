import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {BaseService} from '../../../s/base.service';
import {NetwService} from '../../../s/netw.service';

@Component({
  selector: 'show-ttcontainer',
  templateUrl: './ttcontainer.component.html',
  styleUrls: ['./ttcontainer.component.css']
})
export class TtcontainerComponent implements AfterViewInit{

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

  @Input() set tt(val){
    this._tt = val;
    this.filterVisible();
  }
  _index;
  @Input() set index(val){
    this._index = val;
  }

  constructor(private baseService: BaseService, private netwService: NetwService) { }

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
      console.log(w); // todo
      let VD  = undefined;
      for (let Vobj in w[1]){
        if (Vobj == this.baseService.myStufe) VD = w[1][Vobj];
      }
      console.log(VD);
      if (!VD) return;
      let relevant = [];
      VD.forEach((row) => { this.baseService.myKurse.forEach(function (val) {
          if (val.fach == row.fach) relevant.push(row);
      }); });
      // todo Klasse relevant


    });
  }

  ngAfterViewInit(){
    this.checkVertretung();
  }

}
