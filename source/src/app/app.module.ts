import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './main/c/A_root/app.component';
import { AgbComponent } from './main/c/agb/agb.component';

import { LoginComponent } from './main/c/login/login.component';
import {GuardService} from './main/s/guard.service';
import {HttpClientModule} from '@angular/common/http';
import {NetwService} from './main/s/network/netw.service';
import {AlertService} from './main/s/alert.service';
import { ShowComponent } from './main/c/show/show.component';
import { TtcontainerComponent } from './main/c/show/ttcontainer/ttcontainer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CloudComponent } from './main/c/cloud/cloud.component';
import { AboutComponent } from './main/c/about/about.component';
import { StundenplanComponent } from './main/c/stundenplan/stundenplan.component';
import { ErrorComponent } from './main/c/error/error.component';
import {RefreshttService} from './main/s/refreshtt.service';
import {APP_BASE_HREF} from "@angular/common";
import {BaseService} from "./main/s/base/base.service";
import { AppRoutingModule } from './app-routing.module';
import { SureDialogComponent } from './main/sure/sure.dialog.component';
import {VerifynotkurseModule} from "./verifynotkurse/verifynotkurse.module";
import { WeekspComponent } from './main/c/stundenplan/weeksp/weeksp.component';
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
    ShowComponent,
    TtcontainerComponent,
    CloudComponent,
    AboutComponent,
    StundenplanComponent,
    ErrorComponent,
    SureDialogComponent,
    WeekspComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatSlideToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    AppRoutingModule,
    VerifynotkurseModule
  ],
  providers: [
    BaseService,
    { provide: LOCALE_ID, useValue: "de" },
    GuardService,
    NetwService,
    AlertService,
    RefreshttService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {provide: APP_BASE_HREF, useValue: '/'}
  ],

  bootstrap: [AppComponent],
  entryComponents: [SureDialogComponent]
})
export class AppModule { }

