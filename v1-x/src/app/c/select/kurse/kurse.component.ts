import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {NetwService} from '../../../s/netw.service';
import {AlertService} from '../../../s/alert.service';
import {nullSafeIsEquivalent} from '@angular/compiler/src/output/output_ast';
import {BaseService} from '../../../s/base.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-kurse',
  templateUrl: './kurse.component.html',
  styleUrls: ['./kurse.component.css']
})
export class KurseComponent implements OnInit {

  _stufe: string;
  kurse: {stufe: string, titles: any[], kurse: {title: string, fach: string, lehrer: string, selected?: boolean, ph?: boolean}[]}[];
  stufeKurse: {title: string, fach: string, lehrer: string, selected?: boolean, ph?: boolean}[];
  titles: {t: string, state: number}[] = [];
  valid = false;

  @Input() set stufe(val: string) {
    this._stufe = val;
    if (!val) return;
    this.stufeKurse = undefined;

    // Is already downloaded?
    if (!this.kurse) this.kurse = [];
    this.kurse.forEach((kurs) => {
      if (kurs.stufe === val) {
        this.stufeKurse = kurs.kurse;
        this.titles = kurs.titles
      }
    });
    if (this.stufeKurse) return;
    // no, it isn't
    this.netwService.stufen.then(
      (st) => {
        let i;
        st.forEach((value, index, array) => {
          if (value === this._stufe) i = index;
        });
        this.netwService.getkurse(this._stufe, i + 1)
          .then((val: {title: string, fach: string, lehrer: string, selected?: boolean, ph?: boolean}[]) => {
            // data enhancement
            let v = JSON.parse(JSON.stringify(val));
            v.sort((a, b) => {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            });
            let titles = [];
            let istosplice = [];
            v.forEach((value, i) => {
              if (titles.indexOf(value.title) === -1) {
                titles.push(value.title);
                istosplice.push([i ,{title: value.title, fach: value.title, lehrer: '', ph: true}]);
                istosplice.push([i,{title: value.title, fach: 'FREI', lehrer: ''}]);
              }
            });
            istosplice.forEach((val) => {
              v.splice(val[0], 0, val[1]);
              istosplice.forEach((valueu) => { valueu[0]++; });
            });
            this.titles = [];
            titles.forEach((val) => { this.titles.push({t: val, state: 0}); });
            //

            this.kurse.push({stufe:this._stufe, kurse: v, titles: this.titles});
            this.stufeKurse = v;
          }).catch((err) => {
            this.alert.alert(err, this.alert.DANGER);
          });
      });
  }

  constructor(private netwService: NetwService, private alert: AlertService, private baseService: BaseService, private route: ActivatedRoute) { }

  kursSelected(k: {title: string, fach: string, lehrer: string, selected?: boolean, ph?: boolean} ){
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
    let mykurse = [];
    this.stufeKurse.forEach((val) => {
      if (val.selected && !val.ph) mykurse.push(val);
    });
    this.baseService.MyKurse = mykurse;
    console.log(mykurse);

  }

  ngOnInit() {
    if(!this.route.snapshot.queryParams['force'])
      if (this.baseService.myKurse)
        // todo navigate to next site
        'todo';
  }
}
