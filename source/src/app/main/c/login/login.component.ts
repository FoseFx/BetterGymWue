import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseService} from '../../s/base/base.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public baseService: BaseService, private router: Router, private route: ActivatedRoute) { }

  @ViewChild('loginForm', { static: false }) form: NgForm;
  fine = true;
  show = false;

  ngOnInit() {
    let lcr = false;
    if (
      (this.baseService.credentials && !this.route.snapshot.queryParams['force']) ||
      (this.route.snapshot.queryParams['force'] && lcr)
    ) {
      this.router.navigate(['/show']);
    } else this.show = true;
  }
  formSubmitted() {
    if (!this.form.valid) return;
    const u = this.form.value.nutzer;
    const p = this.form.value.psw;

    this.verify(u, p);
  }

  verify(u: string, p: string) {
    this.baseService.milchglas = true;
    this.baseService.checkCredentials(u, p).then((value => {
      this.baseService.milchglas = false;
      if (value) {
        this.router.navigate(['/']);
      } else {
        this.fine = false;
      }
    })).catch(() => {
      this.baseService.milchglas = false;
    });
  }
}
