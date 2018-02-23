import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './c/A_root/app.component';
import {routes} from './routes';
import { AgbComponent } from './c/agb/agb.component';

import * as bootstrap from 'bootstrap';
import {BaseService} from './s/base.service';
import { LoginComponent } from './c/login/login.component';
import {GuardService} from './s/guard.service';
import {HttpClientModule} from '@angular/common/http';
import { SelectComponent } from './c/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    AgbComponent,
    LoginComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [BaseService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
