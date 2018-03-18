import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  get lenght():number{
    return Object.keys(this.route.snapshot.queryParams).length
  }
  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
  }

}
