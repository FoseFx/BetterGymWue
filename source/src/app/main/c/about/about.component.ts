import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base/base.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../show/ttcontainer/ttcontainer.component.css']
})
export class AboutComponent implements OnInit {
  msg: string[];
  up = false;
  version = this.base.VERSION;
  constructor(private base: BaseService) { }

  ngOnInit() {
  }

}
