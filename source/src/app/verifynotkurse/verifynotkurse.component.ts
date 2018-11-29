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

    this.base.TT.forEach((woche) => {
      woche.days.forEach((day) => {
        day.forEach((stunde, i) => {
          if (stunde.type === "klasse" && filtered.indexOf(stunde.fach) === -1)
            day.splice(i, 1);
        });
      });
    });
    console.log(this.base.TT);
    localStorage.TT = JSON.stringify(this.base.TT);

    this.base.KlassenKurse = filtered;
    localStorage.KlassenKurse = JSON.stringify(filtered);
    localStorage.notUsedNotKurse = JSON.stringify(notUsed);
    this.base.verifiedNonKurse = true;
    localStorage.verifiedNonKurse = true;
    this.router.navigate(["/show"]);
  }

}
