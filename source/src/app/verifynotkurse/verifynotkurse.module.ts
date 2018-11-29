import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifynotkurseComponent } from './verifynotkurse.component';
import {MatButtonModule, MatCardModule} from "@angular/material";
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
