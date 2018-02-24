import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CONFIG} from '../conf';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class BaseService {

  public acceptedAGB: boolean;
  allowedBrowser: boolean;
  public credentials: {u: string, p: string};

  constructor(private router: Router, private httpClient: HttpClient) {
    if (typeof(Storage) === 'undefined') {
      this.allowedBrowser = false;
      // todo auf error page routen
      return;
    }

    this.acceptedAGB = (!!localStorage.acceptedAGB) ? (localStorage.acceptedAGB === 'true') : false;
    this.credentials = (!!localStorage.credentials) ? JSON.parse(localStorage.credentials) : undefined;
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
      }).subscribe( // todo URL
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
    if (this.credentials)
      return this.httpClient.get(url, {
        headers: new HttpHeaders({'Authorization': 'Basic ' + btoa(this.credentials.u + ':' + this.credentials.p)}),
        responseType: 'text'
      });
    else return null;
  }

}
