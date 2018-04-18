import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
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
import { StufeComponent } from './c/select/stufe/stufe.component';
import {NetwService} from './s/netw.service';
import {AlertService} from './s/alert.service';
import { KurseComponent } from './c/select/kurse/kurse.component';
import { ShowComponent } from './c/show/show.component';
import { TtcontainerComponent } from './c/show/ttcontainer/ttcontainer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import { CloudComponent } from './c/cloud/cloud.component';
import { AboutComponent } from './c/about/about.component';
import { StundenplanComponent } from './c/stundenplan/stundenplan.component';
import { ErrorComponent } from './c/error/error.component';
import { HelpComponent } from './c/help/help.component';
import {RefreshttService} from './s/refreshtt.service';
declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    return new Hammer(element, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
      [Hammer.Swipe, {
        direction: Hammer.DIRECTION_HORIZONTAL
      }]
    ]
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AgbComponent,
    LoginComponent,
    SelectComponent,
    StufeComponent,
    KurseComponent,
    ShowComponent,
    TtcontainerComponent,
    CloudComponent,
    AboutComponent,
    StundenplanComponent,
    ErrorComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    BaseService,
    GuardService,
    NetwService,
    AlertService,
    RefreshttService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

