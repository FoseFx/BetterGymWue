import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertService} from '../../s/alert.service';
import {CONFIG} from "../../conf";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private alert: AlertService) { }

  ngOnInit() {
  }

  @ViewChild('supportForm') form: NgForm;
  used = false;

  submitted(){
    if (this.used) return;
    console.log(this.form);
    if(!this.form.valid) return;
    this.used = true;
    let local;
    if(!this.form.value.anonym){
      local = localStorage;
    }
    let req = {
      email: this.form.value.email,
      subject: this.form.value.subject,
      text: this.form.value.text,
      local : local
    };

    let r = Math.floor(100000 + Math.random() * 900000);

    this.http.put(CONFIG.databaseURL + "support/" + r + ".json", req).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.alert.alert(err.statusText, this.alert.DANGER);
      }
    );
  }
  antispam = true;
  bugs: string[];
  ladeBugs(){
    if(!this.antispam) return;
    this.antispam = false;
    this.http.get(CONFIG.databaseURL + "bugs.json").subscribe(
      (c: string[]) => {
        this.bugs = c;
      },
      (err)=> {
        this.alert.alert(err.statusText, this.alert.DANGER);
      }
    )
  }

}
