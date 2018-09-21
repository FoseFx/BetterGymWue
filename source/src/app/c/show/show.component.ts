import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {BaseService} from '../../s/base/base.service';
import {AlertService} from '../../s/alert.service';
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
    if (eType === this.SWIPE_ACTION.RIGHT && this.baseService.selectedTab > 0){
      this.baseService.selectedTab--;
    }else if (eType === this.SWIPE_ACTION.LEFT && this.baseService.selectedTab < this.tab_num -1 ){
      this.baseService.selectedTab++;
    }
  }

  constructor(public baseService: BaseService, private alert: AlertService) {}

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
  }

  change(val){
    this.baseService.selectedTab = val.index;
  }

}
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  let yearStart:any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
