import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {AlertService} from '../../s/alert.service';
import {TimeTableSlot, TT} from "../../Classes";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-stundenplan',
  templateUrl: './stundenplan.component.html',
  styleUrls: ['./stundenplan.component.css', './tabs.scss']
})
export class StundenplanComponent implements OnInit {
  TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  tts = [];
  selectedDay = 0;
  d = new Date();
  selectedIndex: number = (+formatDate(this.d, "w", "de")) % 2 == 0? 0:1;

  constructor(private baseService:BaseService, private alert: AlertService) { }

  ngOnInit() {
    let tt: TT = this.baseService.TT;
    if(!tt) {
      this.alert.alert("Kein Stundenplan gesetzt", this.alert.DANGER);
      return;
    }
    tt.forEach((t, i) => {
      let obj = {
        woche: (i % 2 == 0) ? 'A' : 'B',
        tt: []
      };
      t.days.forEach((tag: TimeTableSlot[]) => {

        let d: {fach: string, raum: string, sel: boolean, isDouble?: boolean, hasDouble?: boolean}[][] = [];

        tag.forEach((stunde: TimeTableSlot, stundeindex) => {
          if(stunde.type == 'klasse') d.push([{fach: stunde.fach, raum: stunde.raum, sel: true}]);
          else{
            let s: {fach: string, raum: string, sel: boolean, isDouble?: boolean, hasDouble?: boolean}[] = [];
            if(!stunde.raeume) {
              d.push([{fach: "Pause", raum:"", sel: true}]);
              return;
            }
            stunde.raeume.forEach((k) => {
              s.push({
                fach: k.kurs,
                raum: k.raum,
                sel: this.getPos(k.kurs) != -1
              });
            });
            /** **/
            let isDouble = false;
            if(stundeindex > 0){
              let davor;
              let down = 1;
              while (davor === undefined && down !== 11){
                davor = d[stundeindex - down];
                down++;
              }

              s.forEach((value, index) => {
                davor.forEach((opposite) => {
                  if(opposite.fach === value.fach && opposite.raum === value.raum && opposite.sel === value.sel) isDouble = true;
                });
              });
              if (isDouble) davor[0].hasDouble = true;
            }
            /** **/
            s.sort(function (a, b) {
              return (a.sel < b.sel) ? 1 : (a.sel > b.sel) ? -1: 0;
            });
            if (isDouble) s[0].isDouble = true;
            d.push(s);
          }
        });
        obj.tt.push(d);
      });
      this.tts.push(obj);
    });
    console.log(this.tts);
    this.selectedDay = (this.d.getDay() > 0 && this.d.getDay() <= 5)? this.d.getDay() - 1: 0;
  }

  getPos(fach):number{
    let val = -1;
    this.baseService.myKurse.forEach((k, i) => {
      if(k.fach.toUpperCase() == fach.toUpperCase()) val = i;
    });
    return val;
  }

  resetDay(){
    this.selectedDay = 0;
  }


}
