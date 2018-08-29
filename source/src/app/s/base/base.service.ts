
import {from as observableFrom, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CONFIG} from '../../conf';
import * as $ from 'jquery';
import {WorkerService} from "../worker.service";
import {AlertService} from "../alert.service";
import * as AppMeta from "./appMeta.base";


declare function unescape(s:string): string;
@Injectable()
export class BaseService {
  public VERSION = "1.3.1 Beta";
  public acceptedAGB: boolean;
  allowedBrowser: boolean;
  public credentials: {u: string, p: string, l?: {u: string, p: string}};
  public myKurse;
  public myStufe;
  public myStufeID;
  public TT;
  public KlassenKurse; // guter Name
  public kursID;
  public noswipe = false;
  private _preLehrer:boolean;
  public milchglas = false;
  public selectedTab = 0;
  public dead = false;
  public _notificationsEnabled;
  public ferien = false;
  public ferienEndsOn = "";
  public justResetted = false;
  public deadTested = false;

  constructor(public router: Router,
              public httpClient: HttpClient,
              private workerService: WorkerService,
              private alertService: AlertService
  ) {

    if (typeof(Storage) === 'undefined') {
      this.allowedBrowser = false;
      this.router.navigate(['error'], {queryParams: {'oldBrowser': 'true'}});
      return;
    }
    localStorage.VERSION = this.VERSION;
    // TODO eval("gtag('event', 'startup', {'bgw_version_in_use': localStorage.VERSION})");
    this.dead = (!!localStorage.dead) ? (localStorage.dead === 'true') : false;
    this.acceptedAGB = (!!localStorage.acceptedAGB2) ? (localStorage.acceptedAGB2 === 'true') : false;
    this.credentials = (!!localStorage.credentials) ? JSON.parse(localStorage.credentials) : undefined;
    this.myKurse = (!!localStorage.myKurse) ? JSON.parse(localStorage.myKurse) : undefined;
    this.myStufe = (!!localStorage.myStufe) ? localStorage.myStufe : undefined;
    this.myStufeID = (!!localStorage.myStufeID) ? localStorage.myStufeID : undefined;
    this.TT = (!!localStorage.TT) ? JSON.parse(localStorage.TT) : undefined;
    this.KlassenKurse = (!!localStorage.KlassenKurse) ? JSON.parse(localStorage.KlassenKurse) : undefined;
    this.kursID = (!!localStorage.kursID) ? localStorage.kursID : undefined;
    this._preLehrer = (!!localStorage.preLehrer) ? (localStorage.preLehrer == 'true') : true;
    this._notificationsEnabled = (!!localStorage.notificationsEnabled) ? localStorage.notificationsEnabled == "true" :undefined;
    this.justResetted = (!!localStorage.justResetted) ? (localStorage.justResetted == "true"): false;
    localStorage.justResetted = false;
    navigator.serviceWorker.ready.then(() => {workerService.checkUpdates();});
    AppMeta.checkFerien(this);
    AppMeta.needsReset(this.httpClient);
  }

  public needsUpdate = () => AppMeta.needsUpdate(this);

  set notificationsEnabled(val){
    this._notificationsEnabled = val;
    localStorage.notificationsEnabled = val;
  }

  get notificationsEnabled(){
    return this._notificationsEnabled;
  }

  set preLehrer(val){
    this._preLehrer = val;
    localStorage.preLehrer = val;
  }

  get preLehrer() {
    return this._preLehrer;
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

    this.TT = val;
    localStorage.TT = JSON.stringify(val);
    let a = [];
    console.log(val);
    val.forEach((wocheV) => {
      wocheV.days.forEach((tag) => {
        tag.forEach((stunde) => {
          if(stunde.type == "klasse" && a.indexOf(stunde.fach) === -1) a.push(stunde.fach);
        });
      });
    });
    this.KlassenKurse = a;
    localStorage.KlassenKurse = JSON.stringify(a);

  }

  acceptAGB() {
    this.acceptedAGB = true;
    localStorage.acceptedAGB2 = true;
    this.install();
    this.router.navigate(['/'], {queryParams: {ua: ''}});
  }

  checkCredentials(u: string, p: string, lehrer?:boolean) {
    lehrer = lehrer || false;
    return new Promise((resolve) => {
      this.httpClient.get((lehrer)? CONFIG.credentialsCheckLehrerUrl : CONFIG.credentialsCheckUrl, {
        headers: new HttpHeaders({'Authorization': 'Basic ' + btoa(u + ':' + p)}),
        responseType: 'text'
      }).subscribe(
        (value) => {
          if (value && !lehrer) {
            localStorage.credentials = JSON.stringify({u: u, p: p});
            this.credentials = {u: u, p: p};
            resolve(true);
          }else if(value && lehrer){
            let obj = JSON.parse(localStorage.credentials);
            obj.l = {u: u, p: p};
            console.log(obj);
            localStorage.credentials = JSON.stringify(obj);
            this.credentials = obj;
            resolve(true);
          }
        },
        (err) => {
          if(!lehrer){
            delete localStorage.credentials;
            this.credentials = undefined;
          }
          resolve(false);
        }
      );
    });
  }

  makeConnections(url: string, lehrer?:boolean):Observable<any>{
    lehrer = lehrer || false;
    if (this.credentials){
      let credentials = this.credentials;

      let p = new Promise((resolve, reject) => {
        $.ajax({
          contentType: 'Content-type: text/html; charset=iso-8859-1',
          url: url,
          beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Basic " + ((!lehrer) ? btoa(credentials.u + ':' + credentials.p) : btoa(credentials.l.u+ ':' +credentials.l.p)));
            xhr.overrideMimeType('text/html;charset=iso-8859-1');
          },
          type: "GET",
          success: (html) => {
            resolve(html);
          },
          error: (err, r) => {
            let e = {statusText: r, err: err};
            reject(e);
          }
        });
      });
      return observableFrom(p);
    }
    else return null;
  }


  install(){
    // @ts-ignore
    if (!!window.installpromptevent){
      // @ts-ignore
      window.installpromptevent.prompt();
      // @ts-ignore
      window.installpromptevent.userChoice.then((choice)=>{
        console.log('choice',choice);
        if(choice.outcome === "accepted" ){
          // @ts-ignore
          delete window.installpromptevent;
          this.alertService.alert("Installiert! Du kannst die App jetzt öffnen");
        }else if (choice.outcome === "dismissed"){
          this.alertService.alert("Installation fehlgeschlagen. Probiere es über das Menü erneut", this.alertService.DANGER)
        }
      });
    }
  }

  private _ws = [];

  setLastVD(index:number, w, lehrer:boolean){
    console.log("setLastVD: " + index + ", " + lehrer);
    this._ws[index] = w;
    localStorage.lastVD = JSON.stringify({d: new Date(), w: this._ws, lehrer: lehrer});
  }



}
