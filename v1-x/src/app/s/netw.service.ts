import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../conf';
import {BaseService} from './base.service';
import {AlertService} from './alert.service';

@Injectable()
export class NetwService {

  private _kurse;
  private _stufen;

  constructor(private baseService: BaseService, private alertService: AlertService) {
    this._stufen = (localStorage.stufen) ? JSON.parse(localStorage.stufen) : undefined;
  }


  get kurse() {
    return this._kurse;
  }

  get stufen(): Promise<string[]> {
    return new Promise((resolve, reject) => {

      if (this._stufen) resolve(this._stufen);
      const resp = this.baseService.makeConnections(CONFIG.credentialsCheckUrl);
      if (resp === null) {
        this.alertService.alert('Failure: No Credentials given, how you even get here?', this.alertService.DANGER);
        reject();
      }
      resp.subscribe(
        (wert) => {
          let a = wert.split('var classes = ')[1].split(';')[0].replace(/(")|(\[)|(])|( )/g, '').split(',');
          localStorage.stufen = JSON.stringify(a);
          this._stufen = a;
          console.log(a);
          resolve(this._stufen);
        },
        (err) => {
          console.log(err);
          this.alertService.alert('Failure: ' + err.statusText, this.alertService.DANGER);
        }
      );
    });
  }

}
