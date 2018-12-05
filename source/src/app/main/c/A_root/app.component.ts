import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {NetwService} from '../../s/network/netw.service';
import {RefreshttService} from '../../s/refreshtt.service';
import localeDe from "@angular/common/locales/de"
import {registerLocaleData} from "@angular/common";
import {MessageService} from "../../s/message.service";
import {MatDialog} from "@angular/material";
import {SureDialogComponent} from "../../sure/sure.dialog.component";
registerLocaleData(localeDe);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public baseService: BaseService, private netwService: NetwService,
              private refresh: RefreshttService, public message: MessageService,
              private dialog: MatDialog){};


  @ViewChild('hamNav') hamnav;
  @ViewChild('cntnd') content;

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
  	if(this.baseService.myKurse)
  		this.refresh.needsRefresh().then((r) => this.needsRefresh = r);
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
    this.hamnav.close();
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe((v: boolean) => {
      if(v){
        this.refresh.removeKurse();
        rl();
      }
    });
  }

  refreshTT(){
    this.hamnav.close();
    const dialogRef = this.dialog.open(SureDialogComponent);
    dialogRef.afterClosed().subscribe((v: boolean) => {
      if(v)
        this.refresh.refreshTT().then(()=>{
          rl()
        });
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
