import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CONFIG} from '../conf';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare function unescape(s:string): string;
@Injectable()
export class BaseService {

  public acceptedAGB: boolean;
  allowedBrowser: boolean;
  public credentials: {u: string, p: string};
  public myKurse;
  public myStufe;
  public myStufeID;
  public TT;

  constructor(private router: Router, private httpClient: HttpClient) {
    if (typeof(Storage) === 'undefined') {
      this.allowedBrowser = false;
      // todo auf error page routen
      return;
    }

    this.acceptedAGB = (!!localStorage.acceptedAGB) ? (localStorage.acceptedAGB === 'true') : false;
    this.credentials = (!!localStorage.credentials) ? JSON.parse(localStorage.credentials) : undefined;
    this.myKurse = (!!localStorage.myKurse) ? JSON.parse(localStorage.myKurse) : undefined;
    this.myStufe = (!!localStorage.myStufe) ? localStorage.myStufe : undefined;
    this.myStufeID = (!!localStorage.myStufeID) ? localStorage.myStufeID : undefined;
    this.TT = (!!localStorage.TT) ? JSON.parse(localStorage.TT) : undefined;
  }

  set MyKurse(val){
    this.myKurse = val;
    localStorage.myKurse = JSON.stringify(val);
  }
  set MyStufe(val: string[]){
    this.myStufe = val[0];
    this.myStufeID = val[1];
    localStorage.myStufe = val[0];
    localStorage.myStufeID = val[1];
  }
  setTT(val){
    console.log("setzte tt ");
    console.log(val);
    this.TT = val;
    localStorage.TT = JSON.stringify(val);
  }

  acceptAGB() {
    this.acceptedAGB = true;
    localStorage.acceptedAGB = true;
    this.router.navigate(['/'], {queryParams: {ua: ''}});
  }

  checkCredentials(u: string, p: string) {
    return new Promise((resolve, reject) => {

      this.httpClient.get(CONFIG.credentialsCheckUrl, {
        headers: new HttpHeaders({'Authorization': 'Basic ' + btoa(u + ':' + p)}),
        responseType: 'text'
      }).subscribe(
        (value) => {
          if (value) {
            localStorage.credentials = JSON.stringify({u: u, p: p});
            this.credentials = {u: u, p: p};
            resolve(true);
          }
        },
        (err) => {
          delete localStorage.credentials;
          this.credentials = undefined;
          resolve(false);
        }
      );
    });
  }

  makeConnections(url: string) {
    if (this.credentials){
      let he = new HttpHeaders({
          'Authorization': 'Basic ' + btoa(this.credentials.u + ':' + this.credentials.p),
          'Content-Type': 'Content-type: text/html; charset=iso-8859-1'
        });
      return this.httpClient.get(url, {
        headers: he,
        responseType: 'text'
      }).map((r) => {
        //return unescape(encodeURI(r)); todo fix problems with encoding
        return r;
      });
    }
    else return null;
  }

}
