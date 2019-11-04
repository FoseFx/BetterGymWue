import {Component, Input} from '@angular/core';
import {NetwService} from '../../../s/network/netw.service';
import {AlertService} from '../../../s/alert.service';
import {BaseService} from '../../../s/base/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Kurs, NetworkError, TimeTableSlot} from "../../../../Classes";
import { MatDialog } from "@angular/material/dialog";
import {GetFromKurseData, GetFromKurseModalComponent} from "./get-from-kurse-modal.component";

@Component({
  selector: 'app-kurse',
  templateUrl: './kurse.component.html',
  styleUrls: ['./kurse.component.css']
})
export class KurseComponent {

  _stufe: string;
  kurse: {stufe: string, titles: any[], kurse: Kurs[]}[];
  stufeKurse: Kurs[];
  titles: {t: string, state: number}[] = [];
  valid = false;
  _cloud = true;

  set cloud(val){
    this._cloud = val;
    console.log(val);
  }
  get cloud(){
    return this._cloud;
  }

  @Input() set stufe(vall: string) {
    this._stufe = vall;
    if (!vall) return;

    this.stufeKurse = undefined;

    // Is already downloaded?
    if (!this.kurse) this.kurse = [];
    this.kurse.forEach((kurs) => {
      if (kurs.stufe === vall) {
        this.stufeKurse = kurs.kurse;
        this.titles = kurs.titles
      }
    });
    if (this.stufeKurse) return;
    // no, it isn't
    this.baseService.milchglas = true;
    const val: Kurs[] = [
    	{fach: "F1", lehrer: "L1", title: "T1", ph: false, selected: false},
    	{fach: "F2", lehrer: "L2", title: "T1", ph: false, selected: false},
    	{fach: "F3", lehrer: "L3", title: "T2", ph: false, selected: false},
		];
		// data enhancement
		let v = JSON.parse(JSON.stringify(val));
		v.sort((a, b) => {
			if (a.title > b.title) return 1;
			if (a.title < b.title) return -1;
			return 0;
		});
		let titles: string[] = [];
		let istosplice: [number, Kurs][] = [];
		v.forEach((value, i) => {
			if (titles.indexOf(value.title) === -1) {
				titles.push(value.title);
				istosplice.push([i ,{title: value.title, fach: value.title, lehrer: '', ph: true}]);
				istosplice.push([i,{title: value.title, fach: 'FREI', lehrer: ''}]);
			}
		});
		istosplice.forEach((valll) => {
			v.splice(valll[0], 0, valll[1]);
			istosplice.forEach((valueu) => { valueu[0]++; });
		});
		this.titles = titles.map((valll) => ({t: valll, state: 0}));

		this.kurse.push({stufe:this._stufe, kurse: v, titles: this.titles});
		this.stufeKurse = v;
		this.baseService.milchglas = false;
  }

  constructor(private alert: AlertService,
              private baseService: BaseService,
              private route: ActivatedRoute,
              private  router: Router) { }

  kursSelected(k: Kurs ){
    if(k.ph) return;
    k.selected = !k.selected;
    let valid = 0;
    this.titles.forEach((val) => {
      if (val.t === k.title) {
        if (k.selected){
          val.state++
        } else {
          val.state--;
        }
      }
      if(val.state === 1) valid++;
    });
    this.valid = valid === this.titles.length;
  }

  kursSubmit(){
    if (!this.valid) return;
    this.baseService.milchglas = true;
    let mykurse = [];
    this.stufeKurse.forEach((val) => {
      if (val.selected && !val.ph) mykurse.push({title: val.title, fach: val.fach, lehrer: val.lehrer});
    });
    this.baseService.MyKurse = mykurse;
    console.log(mykurse);
    const tt: {tt: { days: TimeTableSlot[][]}[], hash: string} = {
    	hash: "1",
			tt: [
				{
					days: [
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
					]
				},
				{
					days: [
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
						[{fach: 'T1', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F1', raum: 'R1'}]}, {fach: 'T2', lehrer: 'L1', type: 'kurs', raeume: [{kurs: 'F3', raum: 'R3'}]}],
					]
				},
			],
		};
    this.baseService.setTT(tt);
    this.baseService.milchglas = false;
    this.router.navigate(['show']);

  }
}
