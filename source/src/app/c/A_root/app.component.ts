import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseService} from '../../s/base.service';
import * as $ from 'jquery';
import {NetwService} from '../../s/netw.service';
import {RefreshttService} from '../../s/refreshtt.service';
import {AlertService} from "../../s/alert.service";
import {WorkerService} from "../../worker.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {isNullOrUndefined} from "util";
import {IndexedDBService} from "../../indexed-db.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public baseService: BaseService, private netwService: NetwService,
              private refresh: RefreshttService, private workerService: WorkerService){};


  @ViewChild('hamNav') hamnav;
  @ViewChild('cntnd') content;

  done = false;
  updateAv = false;
  win = window;
  fakenotificationUndefined = false;

  ngOnInit(){
    let last = localStorage.lastTTcheck;
    if(last == undefined){
      localStorage.lastTTcheck = new Date();
      last = new Date();
    }
    else last = Date.parse(last);
    last = new Date(last);
    last.setDate(last.getDate() + 7);
    if (last < new Date()){
      console.log("exec");
      localStorage.lastTTcheck = new Date();
      this.refreshTT();
    }else this.done = true;
    if(!this.done) return;

    this.baseService.needsUpdate().then(() => {this.updateAv = true;}).catch();
    this.workerService.checkUpdates();

  }

  swipe(type, e){
    if ($(".fuckYou").has(e.target).length != 0) return;
    if(type === 'r' && this.hamnav.opened === false){
      this.hamnav.open();
    }if(type === 'l'){
      this.hamnav.close();
    }
  }

  removeKurse(){
    this.refresh.removeKurse();
    rl()
  }

  refreshTT(){
    this.refresh.refreshTT().then(()=>{
      rl()
    });
  }

  get credentialsLiegen(){
    if (!this.baseService.credentials) return false;
    return !this.baseService.credentials.l;

  }

  subs(){
    this.setNotificationsEnabled(true);
    this.fakenotificationUndefined = false;
    this.workerService.subscribe();
  }
  get notificationsUndefined(){
    if(this.fakenotificationUndefined) return true;
    return isNullOrUndefined(this.baseService.notificationsEnabled) && this.baseService.TT;
  }
  setNotificationsEnabled(val: boolean){
    if(!val) this.fakenotificationUndefined = false;
    this.baseService.notificationsEnabled = val;
  }

  notificationSidenav(){
    this.fakenotificationUndefined = true;
    this.hamnav.close();
  }

}
function rl(){
  setTimeout(() => {
    location.reload();
  }, 500);
}
