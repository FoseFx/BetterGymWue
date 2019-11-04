import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../../s/base/base.service';

@Component({
  selector: 'app-stufe',
  templateUrl: './stufe.component.html',
  styleUrls: ['./stufe.component.css']
})
export class StufeComponent implements OnInit {

  constructor(private baseService: BaseService) { }

  stufen:string[] = [];
  tempSelectedValue = '';
  selectedValue: string;

  ngOnInit() {
    this.stufen = ["DEMO"];
  }

  setValue(){
    this.selectedValue = this.tempSelectedValue;
    this.baseService.MyStufe = [this.selectedValue, (this.stufen.indexOf(this.selectedValue) + 1).toString()];
  }
}
