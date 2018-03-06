import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../s/base.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit() {
  }

}
