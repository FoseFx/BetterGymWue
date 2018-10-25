import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {NetwService} from '../../s/network/netw.service';
import {RefreshttService} from '../../s/refreshtt.service';
import localeDe from "@angular/common/locales/de"
import {registerLocaleData} from "@angular/common";
import {MessageService} from "../../s/message.service";
registerLocaleData(localeDe);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public baseService: BaseService, private netwService: NetwService,
              private refresh: RefreshttService, public message: MessageService){};


  @ViewChild('hamNav') hamnav;
  @ViewChild('cntnd') content;

  done = false;
  updateAv = false;
  reset = {header: undefined, message: undefined};

  get win(){
    return window;
  }

  install(){
    this.baseService.install();
    this.hamnav.close();
  }


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
    if (this.baseService.justResetted) {
      this.reset.header = this.baseService.getResetHeader();
      this.reset.message = this.baseService.getResetMessage();
    }
  }

  swipe(type, e){
    if(document.getElementsByClassName("fuckYou")[0].contains(e.target)) return;
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

}
function rl(){
  setTimeout(() => {
    location.reload();
  }, 500);
}
