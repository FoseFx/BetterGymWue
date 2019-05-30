import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifynotkurseComponent } from './verifynotkurse.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {VerifynotkurseRoutingModule} from "./verifynotkurse-routing.module";

@NgModule({
  imports: [
    CommonModule,
    VerifynotkurseRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [VerifynotkurseComponent]
})
export class VerifynotkurseModule {
}
