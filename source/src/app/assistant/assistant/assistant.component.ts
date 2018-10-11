import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import {AlertService} from "../../main/s/alert.service";
import {BaseService} from "../../main/s/base/base.service";
import {CONFIG} from "../../conf";
import {Kurs} from "../../Classes";
import {REGEXES} from "./regexes";
import {PREFILLS} from "./prefills";

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {

  provider: firebase.auth.GoogleAuthProvider;
  AUTH: firebase.auth.Auth;
  block = false;
  loginned = false;
  schritt = "";
  sub:string;
  token;
  dbresult;
  aliases = [];
  done = false;
  constructor(public alert: AlertService, public base: BaseService) { }

  ngOnInit() {
    try{
      firebase.initializeApp({
        apiKey: "AIzaSyBsE0d3mCVzykUWgGBhxM3ID1VWXhPcEOk",
        authDomain: "bettergymwue.firebaseapp.com",
        projectId: "bettergymwue"
      });
      this.provider = new firebase.auth.GoogleAuthProvider();
      this.AUTH = firebase.auth();
    }catch (err) {
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
      }
    }

  }


  async signIn(){
    this.block = true;
    this.schritt = "1. Bei Google anmelden";
    try{
      let result = await this.AUTH.signInWithPopup(this.provider);
      console.log(result);
      // @ts-ignore
      this.token = result.credential.idToken;
      // @ts-ignore
      this.sub = JSON.parse(atob(result.user.qa.split(".")[1])).sub;
      console.log("sub", this.sub);

      await this.fetchDB();

      this.doPrefills();

      this.loginned = true;
    }catch (e) {
      console.log("nah", e);
      this.alert.alert(e.message, this.alert.DANGER);
    }finally {
      this.block = false;
      this.schritt = "";
    }
  }

  public doPrefills():void {
    this.base.myKurse.forEach((k: Kurs, i) => {
      const ind = REGEXES.findIndex((r: RegExp) => r.test(k.fach));
      if(ind !== -1) this.aliases[i] = PREFILLS[ind];
    });
    this.base.KlassenKurse.forEach((k, i) => {
      const ind = REGEXES.findIndex(r => r.test(k));
      if(ind !== -1) this.aliases[i+this.base.myKurse.length] = PREFILLS[ind];
    });

  }

  async fetchDB(){
    this.schritt = "2. Datenbank nach dir abfragen";
    let dbresult = await this.base.httpClient.get(CONFIG.actionsDB + this.sub + "/exists.json").toPromise();
    dbresult = !!dbresult;
    this.dbresult = dbresult;
    // userDBResult = ist in Datenbank
    console.log("dbresult", dbresult);
  }

  async dbQuery(){
    if(!this.fulfilled) return;

    this.done = true;

    this.schritt = "3. Dich in Datenbank eintragen";
    let actionsRegisterResult = await this.base.httpClient.post(CONFIG.actionsApp, {
      stufe: this.base.myStufe,
      stufeid: +this.base.myStufeID,
      kurse: this.base.myKurse,
      token: this.token,
      creds: this.base.credentials,
      aliases: this.aliases,
      klasse: this.base.KlassenKurse
    }).toPromise();

    console.log("result2", actionsRegisterResult);
    this.schritt = "4. Fertig";

  }

  get fulfilled(){
    return (
      this.aliases.length === (this.base.myKurse.length + this.base.KlassenKurse.length))
      && this.aliases.every(value => !!value.replace(/\s/g, ""));
  }



}
