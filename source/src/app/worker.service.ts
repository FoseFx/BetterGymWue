import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONFIG} from "./conf";
import {IndexedDBService} from "./indexed-db.service";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(private httpClient: HttpClient, private indexedDBService: IndexedDBService){}

  hasWorker = false;
  worker:ServiceWorkerRegistration = null;
  subscribed = false;
  subscription = null;
  checkUpdates() {
    this.hasWorker = !!window['serviceWorkerObj'];
    if(this.hasWorker) this.worker = window['serviceWorkerObj'];
    console.log('worker',this.hasWorker);
    if(!this.hasWorker) return;
    this.worker.pushManager.getSubscription().then((subs)=>{
      this.subscribed = subs!==null;
      this.subscription = subs;
      console.log('subs', this.subscribed);
    });
  }

  subscribe(){
    this.indexedDBService.save();
    navigator.serviceWorker.getRegistration().then((reg)=> {
      reg.pushManager.subscribe({userVisibleOnly: true}).then((subs) => {
        this.subscribed = true;
        this.subscription = subs;
        this.updateServer();
      }).catch((err)=> {
        console.log(err);
      })
    });
  }

  updateServer(){
    console.log(this.subscription);
    this.httpClient.post(CONFIG.subsciptionUrl, this.subscription.toJSON()).subscribe(
      (e)=>{console.log('Success m8');/*TODO Show Great news*/},
      (e)=>{console.log('error', e);/*TODO Show Error*/}
    );
  }

}
