import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseService} from '../../s/base.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {version} from 'punycode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public baseService: BaseService, private router: Router, private route: ActivatedRoute) { }

  @ViewChild('loginForm') form: NgForm;
  fine = true;
  show = false;
  falseLehrerLogin = false;

  ngOnInit() {
    let lcr;
    try{
      lcr = !!this.baseService.credentials.l;
    } catch (e){lcr = false}
    if (
      (this.baseService.credentials && !this.route.snapshot.queryParams['force']) ||
      (this.route.snapshot.queryParams['force'] && lcr)
    ) {
      this.router.navigate(['/select']);
    } else this.show = true;
    console.log(this.baseService.credentials);
  }
  formSubmitted() {
    if (!this.form.valid) return;
    const u = this.form.value.nutzer;
    const p = this.form.value.psw;

    if(u == "lehrer"){
      if(!this.baseService.credentials) this.falseLehrerLogin = true;
      else this.verifyLehrer(u, p);
    }else if (u == "schueler") this.verify(u, p);
  }

  verify(u: string, p: string) {
    this.baseService.milchglas = true;
    this.baseService.checkCredentials(u, p).then((value => {
      this.baseService.milchglas = false;
      if (value) {
        this.router.navigate(['/select']);
      } else {
        this.fine = false;
      }
    })).catch(() => {
      this.baseService.milchglas = false;
    });
  }

  verifyLehrer(u:string, p:string){
    this.baseService.milchglas = true;
    this.baseService.checkCredentials(u, p, true).then((val) => {
      this.baseService.milchglas = false;
      if(val == true){
        this.router.navigate(['/select']);
      }else{
        this.fine = false;
      }
    })
      .catch(() => {
      this.baseService.milchglas = false;
    });
  }

  ngAfterViewInit(): void {

  }
}
