import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  msg;
  upDATE;
  up = false;
  version = '1.0.5 Beta';
  constructor(private httpC: HttpClient) { }

  ngOnInit() {
    this.httpC.get("https://api.github.com/repos/FoseFx/BetterGymWue/commits").subscribe(
      (cntnt) => {
        let c = cntnt[0];
        this.upDATE = c.commit.author.date;
        this.msg = c.commit.message;
        if(!this.msg.match(this.version)) this.up = true;
      }
    )
  }

}
