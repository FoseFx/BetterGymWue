import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONFIG} from "../conf";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message$: Observable<{msg:string, title:string, count:number }>;
  private _count = 0;
  private dlCount = 0;
  constructor(http: HttpClient) {
    this.count = (!!localStorage.messageCount)? localStorage.messageCount: 0;
    this.message$ = <Observable<{msg:string, title:string, count:number }>>(http.get(CONFIG.message));
    this.message$.subscribe((val) => {
      this.dlCount = val.count;
    });
  }
  public get count(){return this._count};
  public set count(val: number){this._count = val; localStorage.messageCount = val;}

  public resetCount(){
    this.count = this.dlCount;
  }

}
