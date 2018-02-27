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

  constructor(private baseService: BaseService, private router: Router, private route: ActivatedRoute) { }

  @ViewChild('loginForm') form: NgForm;
  fine = true;
  show = false;

  ngOnInit() {
    if (this.baseService.credentials && !this.route.snapshot.queryParams['force']) {
      this.router.navigate(['/select']);
    } else this.show = true;
  }
  formSubmitted() {
    if (!this.form.valid) return;
    const u = this.form.value.nutzer;
    const p = this.form.value.psw;
    this.verify(u, p);
  }

  verify(u: string, p: string) {
    this.baseService.checkCredentials(u, p).then((value => {
      if (value) {
        this.router.navigate(['/select']);
      } else {
        this.fine = false;
      }
    }));
  }


  ngAfterViewInit(): void {

  }
}