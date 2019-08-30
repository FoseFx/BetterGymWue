import {from as observableFrom, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APP_VERSION, CONFIG} from '../../../conf';
import {AlertService} from "../alert.service";
import * as AppMeta from "./appMeta.base";
import {Kurs, LoginResponse, TT} from "../../../Classes";
import {map} from "rxjs/operators";


@Injectable()
export class BaseService {

  public VERSION = APP_VERSION;
  public acceptedAGB: boolean;
  allowedBrowser: boolean;
	public credentials: {u: string, p: string};
	public session: LoginResponse;
  public myKurse: Kurs[];
  public myStufe: string;
  public myStufeID;
  public TT: TT;
  public KlassenKurse: string[]; // Kurs.fach
  public kursID;
  public noswipe = false;
  private _preLehrer:boolean;
  public milchglas = false;
  public selectedTab = 0;
  public dead = false;
  public ferien = false;
  public ferienEndsOn = "";
  public justResetted = false;
  public deadTested = false;
  public verifiedNonKurse = false;


  constructor(public router: Router,
              public httpClient: HttpClient,
              private alertService: AlertService
  ) {
    if (typeof(Storage) === 'undefined') {
      this.allowedBrowser = false;
      this.router.navigate(['error'], {queryParams: {'oldBrowser': 'true'}});
      return;
    }
    localStorage.VERSION = this.VERSION;
    try{
      eval("gtag('event', 'startup', {'bgw_version_in_use': localStorage.VERSION})");
    } catch (e) {
      console.error("Tracking Failed");
    }
    this.dead = (!!localStorage.dead) ? (localStorage.dead === 'true') : false;
    this.acceptedAGB = (!!localStorage.acceptedAGB4) ? (localStorage.acceptedAGB4 === 'true') : false;
		this.credentials = (!!localStorage.credentials) ? JSON.parse(localStorage.credentials) : undefined;
		this.session = (!!localStorage.session) ? JSON.parse(localStorage.session) : undefined;
    this.myKurse = (!!localStorage.myKurse) ? JSON.parse(localStorage.myKurse) : undefined;
    this.myStufe = (!!localStorage.myStufe) ? localStorage.myStufe : undefined;
    this.myStufeID = (!!localStorage.myStufeID) ? localStorage.myStufeID : undefined;
    this.TT = (!!localStorage.TT) ? JSON.parse(localStorage.TT) : undefined;
    this.KlassenKurse = (!!localStorage.KlassenKurse) ? JSON.parse(localStorage.KlassenKurse) : undefined;
    this.kursID = (!!localStorage.kursID) ? localStorage.kursID : undefined;
    this._preLehrer = (!!localStorage.preLehrer) ? (localStorage.preLehrer == 'true') : true;
    this.justResetted = (!!localStorage.justResetted) ? (localStorage.justResetted == "true"): false;
    this.verifiedNonKurse = (!!localStorage.verifiedNonKurse) ? (localStorage.verifiedNonKurse == "true"): false;
    localStorage.justResetted = false;
    AppMeta.checkFerien(this);
    AppMeta.needsReset(this.httpClient);
  }

  public needsUpdate = () => AppMeta.needsUpdate(this);
  public getResetHeader = () => AppMeta.getResetHeader(this);
  public getResetMessage = () => AppMeta.getResetMessage(this);

  set preLehrer(val){
    this._preLehrer = val;
    localStorage.preLehrer = val;
  }

  get preLehrer() {
    return this._preLehrer;
  }

  setTT(val: {tt: { days: any[][]}[], hash: string}){

    this.TT = val.tt;
    localStorage.TT = JSON.stringify(val);
    let a = [];
    console.log(val);
    val.tt.forEach((wocheV) => {
      wocheV.days.forEach((tag) => {
        tag.forEach((stunde) => {
          if(stunde.type == "klasse" && a.indexOf(stunde.fach) === -1) a.push(stunde.fach);
        });
      });
    });
    this.KlassenKurse = a;
    localStorage.KlassenKurse = JSON.stringify(a);
    localStorage.stundnplanHash = val.hash;

  }

  acceptAGB() {
    this.acceptedAGB = true;
    localStorage.acceptedAGB4 = true;
    this.install();
    this.router.navigate(['/'], {queryParams: {ua: ''}});
  }

  checkCredentials(e: string, p: string) {
    return this.httpClient.post(CONFIG.loginUrl, {
    	email: e,
			password: p
		}).pipe(
			map((d: LoginResponse) => {
				if (d.session === null || d.sig === null) {
					return false;
				}
				this.credentials = {u: e, p};
				localStorage.setItem("credentials", JSON.stringify(this.credentials));
				this.session = d;
				localStorage.setItem("session", JSON.stringify(this.session));
				return true;
			})
		).toPromise();
  }
  makeConnections(url: string, lehrer:boolean = false, cache: boolean = true):Observable<any>{
    let cred = this.credentials;
    if(!cred) return null;
    let ext = `?${(Math.random()*10000).toFixed(0)}`;
    if(!cache)
    	ext = "";
    let p = new Promise((resolve, reject) => {
      fetch(url + ext, {
        headers: {
          "Authorization": "Basic " + btoa(cred.u + ':' + cred.p)
        },
        method: "get",
        redirect: "follow",
        cache: "no-cache"
      })
        .then(async function (response) {
          if(response.ok)
            resolve(await response.text());
          else {
            reject({
              statusText: `${response.status} ${response.statusText}`
            });
          }
        })
        .catch((err) => {
          reject({statusText: "Netzwerkfehler"});
        });
    });
    return observableFrom(p);
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
    delete localStorage.lastVD;
    console.log("setLastVD: " + index + ", " + lehrer);
    this._ws[index] = w;
    localStorage.lastVD = JSON.stringify({d: new Date(), w: this._ws, lehrer: lehrer});
  }



}
