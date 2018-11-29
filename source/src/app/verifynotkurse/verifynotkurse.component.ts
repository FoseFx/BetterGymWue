import { Component, OnInit } from '@angular/core';
import {BaseService} from "../main/s/base/base.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verifynotkurse',
  templateUrl: './verifynotkurse.component.html'
})
export class VerifynotkurseComponent implements OnInit {

  klassenK: {klasse: string, sel: boolean}[] = [];
  constructor(private base: BaseService, private router: Router) { }

  ngOnInit() {
    this.klassenK = Array.from(this.base.KlassenKurse).map(s => {return {klasse: s, sel: true}});
    if(!!localStorage.notUsedNotKurse)
      this.klassenK = this.klassenK.concat(JSON.parse(localStorage.notUsedNotKurse).map(s => {return {klasse: s, sel: false};}));
    console.log(this.klassenK);
  }

  submit(){
    const filtered = this.klassenK.filter(o => o.sel).map(o => o.klasse);
    const notUsed = this.klassenK.filter(o => !o.sel).map(o => o.klasse);
    this.base.KlassenKurse = filtered;
    localStorage.KlassenKurse = JSON.stringify(filtered);
    localStorage.notUsedNotKurse = JSON.stringify(notUsed);
    this.base.verifiedNonKurse = true;
    localStorage.verifiedNonKurse = true;
    this.router.navigate(["/show"]);
  }

}
