import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import {AlertService} from "../../s/alert.service";
import {BaseService} from "../../s/base/base.service";
import {CONFIG} from "../../conf";

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {

  provider: firebase.auth.GoogleAuthProvider;
  block = false;
  loginned = false;
  schritt = "";
  sub:string;
  token;
  dbresult;
  aliases = [];
  done = false;
  constructor(private alert: AlertService, public base: BaseService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBsE0d3mCVzykUWgGBhxM3ID1VWXhPcEOk",
      authDomain: "bettergymwue.firebaseapp.com",
      projectId: "bettergymwue"
    });
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  async signIn(){
    this.block = true;
    this.schritt = "1. Bei Google anmelden";
    try{
      let result = await firebase.auth().signInWithPopup(this.provider);
      console.log(result);
      // @ts-ignore
      this.token = result.credential.idToken;
      // @ts-ignore
      this.sub = JSON.parse(atob(result.user.qa.split(".")[1])).sub;
      console.log("sub", this.sub);

      this.schritt = "2. Datenbank nach dir abfragen";
      let dbresult = await this.base.httpClient.get(CONFIG.actionsDB + this.sub + "/exists.json").toPromise();
      dbresult = !!dbresult;
      this.dbresult = dbresult;
      // userDBResult = ist in Datenbank
      console.log("dbresult", dbresult);


      this.loginned = true;
    }catch (e) {
      console.log("nah", e);
      this.alert.alert(e.message, this.alert.DANGER);
    }finally {
      this.block = false;
      this.schritt = "";
    }
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
