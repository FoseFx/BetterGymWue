import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {AlertService} from '../../s/alert.service';
import {TimeTableSlot, TT} from "../../../Classes";
import {formatDate} from "@angular/common";

type TTS = {woche: string, tt: {fach: string, hasDouble: boolean, raum: string, sel: boolean}[][][]}[];
type WeekTTs = {woche: string, tt: {fach: string, hasDouble: boolean, raum: string}[][]}[];

@Component({
  selector: 'app-stundenplan',
  templateUrl: './stundenplan.component.html',
  styleUrls: ['./stundenplan.component.css', './tabs.scss']
})
export class StundenplanComponent implements OnInit {
  TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  tts: TTS = [];
  selectedDay = 0;
  d = new Date();
  selectedIndex: number = (+formatDate(this.d, "w", "de")) % 2 == 0? 0:1;
  weekTTs: WeekTTs;

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
          if(stunde.type == 'klasse') {
            let davor = d[d.length-1];
            let isDouble = false;
            if(davor)
              isDouble = davor[0].fach === stunde.fach && davor[0].raum === stunde.raum;
            if(isDouble) d[d.length-1][0].hasDouble = true;
            d.push([{fach: stunde.fach, raum: stunde.raum, sel: true, isDouble: isDouble}]);
          }
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

              isDouble = s.some(value =>
                !!davor.find(v=>v.fach === value.fach && v.raum === value.raum && v.sel === value.sel)
              );

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
    this.weekTTs = this.generateWeekTTs(this.tts);
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

  generateWeekTTs(tts: TTS): WeekTTs{
  	let newTTs: WeekTTs = []; // this will be returned

  	tts.forEach((wocheOrig) => { // el: woche (A|B)

			let newTT = {woche: wocheOrig.woche, tt: []};

			wocheOrig.tt.forEach((tagOrig, tagIndex) => {

				let deepness = 0;

				tagOrig.forEach((stundeOrig, stundeIndex) => {

					if(!newTT.tt[stundeIndex]){ 		// wenn die stunde noch nie erreicht wurde, hinzufügen
						newTT.tt[stundeIndex] = [];
						if(deepness > 1){							// padding hinzufügen
							// console.log("deepness", deepness, stundeIndex, stundeOrig);
							for(let i = 0; i <= deepness; i++)
								newTT.tt[stundeIndex].push(null);
						}

					}

					const selStunde = this.getSelectedStunde(stundeOrig);
					newTT.tt[stundeIndex].push(selStunde);
					deepness = newTT.tt[stundeIndex].length;

				});
				// fill the rest
				for (let i = tagOrig.length; i !== newTT.tt.length; i++)
					newTT.tt.forEach(s => {
						if(!s[tagIndex])
							s[tagIndex] = null;
					});
			});

			// console.log(newTT);
			// console.table(newTT.tt);
			newTTs.push(newTT); // add week to returning array

		});



  	return newTTs;
	}

	getSelectedStunde(stunde: {fach: string, hasDouble: boolean, raum: string, sel: boolean}[]) : {fach: string, hasDouble: boolean, raum: string}{
  	let el = null;
  	stunde.forEach((fach) => {
  		if(fach.sel)
  			el = {fach: fach.fach, hasDouble: fach.hasDouble, raum: fach.raum};
		});
  	if(el === null)
  		return null;
  		// return {fach: "Frei", hasDouble: false, raum: ""};
  	else
  		return el;
	}

}
