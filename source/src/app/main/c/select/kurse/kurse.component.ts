import {Component, Input} from '@angular/core';
import {NetwService} from '../../../s/network/netw.service';
import {AlertService} from '../../../s/alert.service';
import {BaseService} from '../../../s/base/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Kurs, NetworkError} from "../../../../Classes";
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
    this.baseService.milchglas = true;
    this.netwService.stufen.then(
      (st:string[]) => {
        let i = st.findIndex((val) => val === this._stufe);
        this.netwService.getkurse(this._stufe, i + 1)
          .then((val: Kurs[]) => {
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
            istosplice.forEach((val) => {
              v.splice(val[0], 0, val[1]);
              istosplice.forEach((valueu) => { valueu[0]++; });
            });
            this.titles = titles.map((val) => { return {t: val, state: 0} });

            this.kurse.push({stufe:this._stufe, kurse: v, titles: this.titles});
            this.stufeKurse = v;
            this.baseService.milchglas = false;
          }).catch((err) => {
            this.baseService.milchglas = false;
            this.alert.alert(err, this.alert.DANGER);
          });
      });
  }

  constructor(private netwService: NetwService,
              private alert: AlertService,
              private baseService: BaseService,
              private route: ActivatedRoute,
              private  router: Router,
              private dialog: MatDialog) { }

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
    if(this._cloud === true) {
      this.netwService.saveKurse(mykurse)
        .then(
        (id) =>{this.alert.alert('Dein Kurs-Cloud Code: ' + id + '. Merken!', this.alert.OK, 10000);}
        ).catch((err) => {
          console.log(err.statusText);
      });
    }
    this.baseService.setTT(this.netwService.getTT(this._stufe));
    this.baseService.milchglas = false;
    this.router.navigate(['show']);

  }

  loadFromCloud(id: number): void{
    if(!id) return this.openGetFromKurseModal({failMsg: "Keine ID eingegeben"});
    this.baseService.milchglas = true;
    this.netwService.fetchCloud(id)
      .then( (kurse: Kurs[]) => {
        this.baseService.MyKurse = kurse;
        this.baseService.setTT(
          this.netwService.getTT(this._stufe)
        );
        this.baseService.kursID = id;
        this.baseService.milchglas = false;
        this.router.navigate(['show']);
      })
      .catch((err: NetworkError) => {
        this.baseService.milchglas = false;
        this.openGetFromKurseModal({failMsg: err.statusText});
      });
  }

  openGetFromKurseModal(data: GetFromKurseData = {}): void{
    const dialogRef = this.dialog.open(GetFromKurseModalComponent, {
      width: "90%",
      maxWidth: "400px",
      data: data
    });

    dialogRef.afterClosed().subscribe((res?:GetFromKurseData)=>{
      if(!res) return;
      this.loadFromCloud(data.id);
    });
  }
}
