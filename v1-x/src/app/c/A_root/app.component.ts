import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BaseService} from '../../s/base.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  constructor(public baseService: BaseService){};


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


}
