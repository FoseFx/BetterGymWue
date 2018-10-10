import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import {AlertService} from "../../main/s/alert.service";
import {BaseService} from "../../main/s/base/base.service";
import {CONFIG} from "../../conf";
import {Kurs} from "../../Classes";

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

      const regexes = [
        new RegExp(/(^L|^)Ku($|\d$)/i),
        new RegExp(/^Theat$/i),
        new RegExp(/^ECDL$/i),
        new RegExp(/(^L|^)SP($|\d$)/i),
        new RegExp(/^Garte$/i),
        new RegExp(/^Robot$/i),
        new RegExp(/^Spiel$/i),
        new RegExp(/^LZ\/D$/i),
        new RegExp(/^LZ\/E$/i),
        new RegExp(/^LZ\/M$/i),
        new RegExp(/(^L|^)M($|\d$)/i),
        new RegExp(/(^L|^)D($|\d$)/i),
        new RegExp(/(^L|^)E($|\d$)/i),
        new RegExp(/(^L|^)PH($|\d$)/i),
        new RegExp(/(^L|^)BI($|\d$)/i),
        new RegExp(/^PCL$/i),
        new RegExp(/(^L|^)EK($|\d$)/i),
        new RegExp(/^PPL($|\d$)/i),
        new RegExp(/^Mu($|\d$)/i),
        new RegExp(/^KR($|\d$)/i),
        new RegExp(/^ER($|\d$)/i),
        new RegExp(/(^L|^)F($|\d$)/i),
        new RegExp(/(^L|^)L($|\d$)/i),
        new RegExp(/^Ku-Mu($|\d$)/i),
        new RegExp(/^JuWe($|\d$)/i),
        new RegExp(/^Bi-CH($|\d$)/i),
        new RegExp(/^IF($|\d$)/i),
        new RegExp(/(^L|^)SW($|\d$)/i),
        new RegExp(/(^L|^)Ge($|\d$)/i),
        new RegExp(/(^L|^)Pa($|\d$)/i),
        new RegExp(/^Ita($|\d$)/i),
        new RegExp(/^VTF-M($|\d$)/i),
        new RegExp(/^VTF-D($|\d$)/i),
        new RegExp(/^VTF-E($|\d$)/i),
        new RegExp(/(^L|^)PL($|\d$)/i),
        new RegExp(/^LZ/i),
        new RegExp(/^VTF/i),
        new RegExp(/^CH/i)

      ];
      const prefilles = [
        "Kunst",
        "Theater",
        "ECDL",
        "Sport",
        "Garten AG",
        "Roboter AG",
        "Spiele AG",
        "Lernzeit Deutsch",
        "Lernzeit Englisch",
        "Lernzeit Mathe",
        "Mathe",
        "Deutsch",
        "Englisch",
        "Physik",
        "Biologie",
        "PCL",
        "Erdkunde",
        "Philosophie",
        "Musik",
        "Religion",
        "Religion",
        "Französisch",
        "Latein",
        "Munst-Musik",
        "Jugendwelten",
        "Bio-Chemie",
        "Informatik",
        "SoWi",
        "Geschichte",
        "Pädagogik",
        "Italienisch",
        "Vertiefung Mathe",
        "Vertiefung Deutsch",
        "Vertiefung Englisch",
        "Philosophie",
        "Lernzeit",
        "Vertiefung",
        "Chemie"
      ];
      this.base.myKurse.forEach((k: Kurs, i) => {
        const ind = regexes.findIndex((r: RegExp) => r.test(k.fach));
        if(ind !== -1) this.aliases[i] = prefilles[ind];
      });
      this.base.KlassenKurse.forEach((k, i) => {
        const ind = regexes.findIndex(r => r.test(k));
        if(ind !== -1) this.aliases[i+this.base.myKurse.length] = prefilles[ind];
      });

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
