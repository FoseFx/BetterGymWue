import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {NetwService} from '../../../s/netw.service';
import {AlertService} from '../../../s/alert.service';

@Component({
  selector: 'app-kurse',
  templateUrl: './kurse.component.html',
  styleUrls: ['./kurse.component.css']
})
export class KurseComponent implements OnInit {

  sth = false; /** DEBUG **/
  _stufe: string;

  kurse: {stufe: string, kurse: {title: string, fach: string, lehrer: string}[]}[];
  stufeKurse: {title: string, fach: string, lehrer: string, selected: boolean}[];

  @Input() set stufe(val: string) {
    this._stufe = val;
    if (!val) return;
    this.stufeKurse = undefined;

    // Is already downloaded?
    if (!this.kurse) this.kurse = [];
    this.kurse.forEach((kurs) => {
      if (kurs.stufe === val) this.stufeKurse = kurs.kurse;
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
          .then((val) => {
            this.kurse.push({stufe:this._stufe, kurse: val});
            this.stufeKurse = val;
          }).catch((err) => {
            this.alert.alert(err, this.alert.DANGER);
          });
      }
    );


  }

  constructor(private netwService: NetwService, private alert: AlertService) { }

  ngOnInit() {

  }
}
