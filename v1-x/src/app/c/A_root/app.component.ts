import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BaseService} from '../../s/base.service';
import * as $ from 'jquery';
import {NetwService} from '../../s/netw.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  constructor(public baseService: BaseService, private netwService: NetwService){};


  @ViewChild('hamNav') hamnav;
  @ViewChild('cntnd') content;

  ngAfterViewInit(){
    console.log(this.hamnav);
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
    this.baseService.myKurse = undefined;
    delete localStorage.myKurse;
    this.baseService.kursID = undefined;
    delete localStorage.kursID;
    rl()
  }

  refreshTT(){
    this.removeKurse();
    this.baseService.TT = undefined;
    delete localStorage.TT;
    this.baseService.KlassenKurse = undefined;
    delete localStorage.KlassenKurse;
    rl()
  }


}
function rl(){
  setTimeout(() => {
    location.reload();
  }, 500);
}
