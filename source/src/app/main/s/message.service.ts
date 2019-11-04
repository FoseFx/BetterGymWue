import { Injectable } from '@angular/core';
import {CONFIG} from "../../conf";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _count = 0;
  private dlCount = 0;
  constructor() {
    this.count = (!!localStorage.messageCount)? localStorage.messageCount: 0;
  }
  public get count(){return this._count};
  public set count(val: number){this._count = val; localStorage.messageCount = val;}

  public resetCount(){
    this.count = this.dlCount;
  }

}
