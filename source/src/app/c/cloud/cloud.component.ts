import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseService} from '../../s/base.service';
import {NetwService} from '../../s/netw.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  constructor(public baseService: BaseService, private ntwrkService: NetwService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }
  clicked = false;
  activateCloud(){
    if(this.clicked) return;
    this.clicked = true;
    this.ntwrkService.saveKurse(this.baseService.myKurse).then((code) => {console.log(code);this.ref.detectChanges()});
  }
}
