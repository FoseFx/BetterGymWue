import { Component, OnInit } from '@angular/core';
import {BaseService} from "../main/s/base/base.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verifynotkurse',
  templateUrl: './verifynotkurse.component.html'
})
export class VerifynotkurseComponent implements OnInit {

  klassenK: {klasse: string, sel: boolean, dis: boolean}[] = [];
  constructor(private base: BaseService, private router: Router) { }

  ngOnInit() {
    this.klassenK = Array.from(this.base.KlassenKurse).map(s => {return {klasse: s, sel: true, dis: false}});
    if(!!localStorage.notUsedNotKurse)
      this.klassenK =
        this.klassenK
          .concat(JSON.parse(localStorage.notUsedNotKurse)
          .map(s => {return {klasse: s, sel: false, dis: true};}));
  }

  submit(){
    let oldNotUsed = null;
    if(!!localStorage.notUsedNotKurse)
      oldNotUsed = JSON.parse(localStorage.notUsedNotKurse);


    const filtered = this.klassenK.filter(o => o.sel && !o.dis).map(o => o.klasse);
    const notUsed = this.klassenK.filter(o => !o.sel || o.dis).map(o => o.klasse);

    if(
      JSON.stringify(notUsed) === JSON.stringify(oldNotUsed) &&
      JSON.stringify(filtered) === JSON.stringify(this.base.KlassenKurse)
    ) return this.router.navigate(['/show']);


    this.base.TT.forEach((woche, bwoche: number) => {
      woche.days.forEach((day, dayi: number) => {
        day.forEach((stunde, std: number) => {
          if (stunde.type === "klasse" && filtered.indexOf(stunde.fach) === -1)
            day.splice(std, 1);
        });
      });
    });

    localStorage.TT = JSON.stringify(this.base.TT);
    this.base.KlassenKurse = filtered;
    localStorage.KlassenKurse = JSON.stringify(filtered);
    localStorage.notUsedNotKurse = JSON.stringify(notUsed);
    this.base.verifiedNonKurse = true;
    localStorage.verifiedNonKurse = true;
    this.router.navigate(["/show"]);
  }

}
