import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../conf";
import {IndexedDBService} from "../indexed-db.service";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(private httpClient: HttpClient, private indexedDBService: IndexedDBService, private alert: AlertService){}

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

  unsubscribe(){
    navigator.serviceWorker.getRegistration().then(reg=>{
      reg.pushManager.getSubscription().then(sub=>{
        sub.unsubscribe().then(e=>{
          let oldSubs = sub.toJSON();
          this.httpClient.post(CONFIG.unsubscribeUrl, oldSubs).subscribe(
            (e)=>{console.log('Success m8'); this.alert.alert('Du wirst jetzt keine Benachrichtigungen mehr erhalten');},
            (e)=>{console.log('error', e); this.alert.alert('Irgendetwas ist schief gelaufen :/');}
            );
        })
      })
    }).catch(e=>{console.error(e)})
  }

  updateServer(){
    console.log(this.subscription);
    this.httpClient.post(CONFIG.subsciptionUrl, this.subscription.toJSON()).subscribe(
      (e)=>{console.log('Success m8');this.alert.alert('Du wirst ab jetzt Benachrichtigungen erhalten');},
      (e)=>{console.log('error', e);this.alert.alert('Irgendetwas ist schief gelaufen :/');}
    );
  }

}
