import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import {BaseService} from '../../s/base.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-agb',
  templateUrl: './agb.component.html',
  styleUrls: ['./agb.component.css']
})
export class AgbComponent implements OnInit {

  redirected: boolean;

  constructor(public baseService: BaseService, private activeR: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activeR.snapshot.queryParams['ua'] === '');
    this.redirected = this.activeR.snapshot.queryParams['ua'] === '';
  }
}
