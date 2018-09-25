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
  constructor(private alert: AlertService, private base: BaseService) { }

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
      let sub = JSON.parse(atob(result.user.qa.split(".")[1])).sub;
      console.log("sub", sub);
      this.schritt = "2. Datenbank nach dir abfragen";
      let dbresult = await this.base.httpClient.get(CONFIG.actionsDB + sub + "/exists.json").toPromise();
      dbresult = !!dbresult;
      // dbResult = ist in Datenbank
      console.log("dbresult", dbresult);

      if(!dbresult){
        this.schritt = "3. Dich in Datenbank eintragen";
        this.schritt = "4. Fertig";
      }else {
        // TODO
      }


      this.loginned = true;
    }catch (e) {
      console.log("nah", e);
      this.alert.alert(e.message, this.alert.DANGER);
    }finally {
      this.block = false;
      this.schritt = "";
    }
  }

}
