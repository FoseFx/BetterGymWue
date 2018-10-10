import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
