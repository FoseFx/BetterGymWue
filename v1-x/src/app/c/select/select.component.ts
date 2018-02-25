import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseService} from '../../s/base.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  show = false;
  constructor(private route: ActivatedRoute, private baseService: BaseService) { }

  ngOnInit() {
    if(!this.route.snapshot.queryParams['force']){
      if (this.baseService.myKurse && this.baseService.myStufe && this.baseService.myStufeID)
      // todo navigate to next site
        'todo';
      else this.show = true;
    } else {
      this.show = true;
    }
  }

}
