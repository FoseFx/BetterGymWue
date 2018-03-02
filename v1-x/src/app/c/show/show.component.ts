import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base.service';
import {AlertService} from '../../s/alert.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  selI = 0;
  tts: {
    tag,
    date: Date
  }[] = [];

  constructor(private baseService: BaseService, private alert: AlertService) { }

  ngOnInit() {
    let tt = this.baseService.TT;
    if (!tt) { this.alert.alert("Kein Stundenplan gesetzt", this.alert.DANGER); return; }

    let firstDate;
    tt.forEach((val, i) => {
      let date = new Date();

      if (i === 1) date.setDate(date.getDate() + 1);
      while (date.getDay() === 0 || date.getDay() === 6)
        date.setDate(date.getDate() + 1);
      if (i == 0) firstDate = date;
      if(i === 1 && firstDate.getDate() == date.getDate())
        date.setDate(date.getDate() + 1);
      this.tts.push({tag: val.days[date.getDay() - 1], date: date});
    });
    $(".modal-backdrop").remove();
  }

}
