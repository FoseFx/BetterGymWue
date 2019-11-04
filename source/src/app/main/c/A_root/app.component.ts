import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {NetwService} from '../../s/network/netw.service';
import localeDe from "@angular/common/locales/de"
import {registerLocaleData} from "@angular/common";
import {MessageService} from "../../s/message.service";
import { MatDialog } from "@angular/material/dialog";
registerLocaleData(localeDe);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public baseService: BaseService, public message: MessageService){};


  @ViewChild('hamNav', { static: true }) hamnav;
  @ViewChild('cntnd', { static: true }) content;

  done = true;
  updateAv = false;
  needsRefresh = false;
  reset = {header: undefined, message: undefined};

  get win(){
    return window;
  }

  install(){
    this.baseService.install();
    this.hamnav.close();
  }


  ngOnInit(){
  }

  swipe(type, e){
    if(document.getElementsByClassName("fuckYou")[0].contains(e.target)) return;
    if(type === 'r' && this.hamnav.opened === false){
      this.hamnav.open();
    }if(type === 'l'){
      this.hamnav.close();
    }
  }

  get credentialsLiegen(){
    if (!this.baseService.credentials) return false;
    return !this.baseService.credentials.l;

  }

}
