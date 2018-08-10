import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../s/base.service';

@Component({
  selector: 'app-select',
  template: `<app-stufe *ngIf="show"></app-stufe>`
})
export class SelectComponent implements OnInit {

  show = false;
  constructor(private route: ActivatedRoute, private baseService: BaseService, private router: Router) { }

  ngOnInit() {
    if(!this.route.snapshot.queryParams['force']){
      if (this.baseService.myKurse && this.baseService.myStufe && this.baseService.myStufeID)
        this.router.navigate(['show']);
      else this.show = true;
    } else {
      this.show = true;
    }
  }

}
