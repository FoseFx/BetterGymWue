import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base/base.service';

@Component({
  selector: 'app-agb',
  templateUrl: './agb.component.html',
  styleUrls: ['./agb.component.css']
})
export class AgbComponent implements OnInit {

  redirected: boolean;
  sdse = false;

  constructor(public baseService: BaseService) { }

  ngOnInit() {
    this.redirected = this.baseService.acceptedAGB;
  }
}
