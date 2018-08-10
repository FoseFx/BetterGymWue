import { Component, OnInit } from '@angular/core';
import {NetwService} from '../../../s/network/netw.service';
import {BaseService} from '../../../s/base.service';

@Component({
  selector: 'app-stufe',
  templateUrl: './stufe.component.html',
  styleUrls: ['./stufe.component.css']
})
export class StufeComponent implements OnInit {

  constructor(private netwService: NetwService, private baseService: BaseService) { }

  stufen:string[] = [];
  tempSelectedValue = '';
  selectedValue: string;

  ngOnInit() {
    this.netwService.stufen.then(
      (wert: string[]) => {this.stufen = wert; }
    );
    console.log(this.stufen);
  }

  setValue(){
    this.selectedValue = this.tempSelectedValue;
    this.baseService.MyStufe = [this.selectedValue, (this.stufen.indexOf(this.selectedValue) + 1).toString()];
  }
}
