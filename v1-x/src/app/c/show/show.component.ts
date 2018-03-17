import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {BaseService} from '../../s/base.service';
import {AlertService} from '../../s/alert.service';
import * as $ from 'jquery';
import {MatTab, MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, AfterViewInit {

  tts: {
    tag,
    date: Date
  }[] = [];

  @ViewChild(MatTabGroup) group;
  @ViewChildren(MatTab) tabs;
  tab_num = 0;
  selected = 0;
  SWIPE_ACTION = {
    LEFT: 'swipeleft',
    RIGHT: 'swiperight'
  };

  ngAfterViewInit(){
    this.baseService.noswipe = true;
    this.tab_num = this.tabs.length;
    if(!localStorage.firstVisit){
      localStorage.firstVisit = "false";
      location.reload();
    }
  }
  swipe(e){
    let eType = e.type;
    if (eType === this.SWIPE_ACTION.RIGHT && this.selected > 0){
      this.selected--;
    }else if (eType === this.SWIPE_ACTION.LEFT && this.selected < this.tab_num -1 ){
      this.selected++;
    }
  }

  constructor(private baseService: BaseService, private alert: AlertService) { }

  ngOnInit() {
    let tt = this.baseService.TT;
    if (!tt) { this.alert.alert("Kein Stundenplan gesetzt", this.alert.DANGER); return; }


    let firstDate;

    [0, 1].forEach((val, i) => {
      let date = new Date();

      if (i === 1) date.setDate(date.getDate() + 1);
      while (date.getDay() === 0 || date.getDay() === 6)
        date.setDate(date.getDate() + 1);
      if (i == 0) firstDate = date;
      if(i === 1 && firstDate.getDate() == date.getDate())
        date.setDate(date.getDate() + 1);
      let weeksTT = tt[(getWeekNumber(date) % 2 == 0) ? 0: 1];
      this.tts.push({tag: weeksTT.days[date.getDay() - 1], date: date});
    });
    $(".modal-backdrop").remove();

  }



}
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  let yearStart:any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  return weekNo;
}
