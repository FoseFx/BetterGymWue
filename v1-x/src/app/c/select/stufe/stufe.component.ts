import { Component, OnInit } from '@angular/core';
import {NetwService} from '../../../s/netw.service';

@Component({
  selector: 'app-stufe',
  templateUrl: './stufe.component.html',
  styleUrls: ['./stufe.component.css']
})
export class StufeComponent implements OnInit {

  constructor(private netwService: NetwService) { }

  stufen = [];
  tempSelectedValue = '';
  selectedValue: string;

  ngOnInit() {
    this.netwService.stufen.then(
      (wert) => {this.stufen = wert; }
    );
    console.log(this.stufen);
  }

}
