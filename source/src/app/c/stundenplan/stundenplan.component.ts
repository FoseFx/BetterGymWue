import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {AlertService} from '../../s/alert.service';

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

  constructor(private baseService:BaseService, private alert: AlertService) { }

  ngOnInit() {
    let tt = this.baseService.TT;
    if(!tt) {
      this.alert.alert("Kein Stundenplan gesetzt", this.alert.DANGER);
      return;
    }
    tt.forEach((t, i) => {
      let obj = {
        woche: (i % 2 == 0) ? 'A' : 'B',
        tt: []
      };
      t.days.forEach((tag) => {
        let d = [];
        let l = 0;
        tag.forEach((stunde, stundeindex) => {
          if(stunde.type == 'klasse') d.push([{fach: stunde.fach, raum: stunde.raum, sel: true}]);
          else{
            let s = [];
            if(!stunde.raeume) return;
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
