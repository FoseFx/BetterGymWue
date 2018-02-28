import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {NetwService} from '../../../s/netw.service';
import {AlertService} from '../../../s/alert.service';
import {nullSafeIsEquivalent} from '@angular/compiler/src/output/output_ast';
import {BaseService} from '../../../s/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';

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
  cloud = true;

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

  constructor(private netwService: NetwService, private alert: AlertService, private baseService: BaseService, private route: ActivatedRoute, private  router: Router) { }

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
      if (val.selected && !val.ph) mykurse.push({title: val.title, fach: val.fach, lehrer: val.lehrer});
    });
    this.baseService.MyKurse = mykurse;
    console.log(mykurse);
    if(this.cloud) {
      this.netwService.saveKurse(mykurse)
        .then(
        (id) =>{this.alert.alert('Dein Kurs-Cloud Code: <b>' + id + '</b> unbedingt merken!', this.alert.OK, 10000);}
        ).catch((err) => {
          console.log(err.statusText);
      });
    }
    this.baseService.setTT(this.netwService.getTT(this._stufe));
    this.router.navigate(['show']);

  }

  loadFormCloud(){
    let id = $("#kcidi").val();
    if (!id) return;
    $("#kcidi").addClass('disabled');
    $("#kcb").addClass('disabled');
    this.netwService.fetchCloud(+id)
      .then((kurse) => {
        console.log(kurse);
        this.baseService.MyKurse = kurse;
        this.baseService.setTT(this.netwService.getTT(this._stufe));
        this.router.navigate(['show']);
      })
      .catch((err) => {
        this.alert.alert('DB Connection Failed: ' + err.statusText, this.alert.DANGER);
        $("#kcb").addClass('btn-danger').removeClass('btn-primary').removeClass('disabled');
        $("#kcidi").removeClass('disabled');
      });
  }

  ngOnInit() {

  }

  clickCloud(){
    this.cloud = !this.cloud;
  }
}
