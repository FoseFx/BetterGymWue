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

  ngOnInit() {
    if (this.baseService.credentials && !this.route.snapshot.queryParams['force']) {
      this.router.navigate(['/select']);
    } else this.show = true;
    console.log(this.baseService.credentials);
  }
  formSubmitted() {
    if (!this.form.valid) return;
    this.baseService.milchglas = true;
    const u = this.form.value.nutzer;
    const p = this.form.value.psw;
    this.verify(u, p);
  }

  verify(u: string, p: string) {
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


  ngAfterViewInit(): void {

  }
}
