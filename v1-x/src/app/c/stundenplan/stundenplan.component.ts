import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base.service';
import {CONFIG} from '../../conf';
import {NetwService} from '../../s/netw.service';
import {AlertService} from '../../s/alert.service';

@Component({
  selector: 'app-stundenplan',
  templateUrl: './stundenplan.component.html',
  styleUrls: ['./stundenplan.component.css']
})
export class StundenplanComponent implements OnInit {
  tts = [];
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
        tag.forEach((stunde) => {
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
            d.push(s);
          }
        });
        obj.tt.push(d);
      });
      this.tts.push(obj);
    });
  }
  getPos(fach):number{
    let val = -1;
    this.baseService.myKurse.forEach((k, i) => {
      if(k.fach.toUpperCase() == fach.toUpperCase()) val = i;
    });
    return val;
  }
}
