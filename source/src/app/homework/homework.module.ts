import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeworkRoutingModule } from './homework-routing.module';
import { ShowHomeworkComponent } from './c/show-homework/show-homework.component';

@NgModule({
  declarations: [ShowHomeworkComponent],
  imports: [
    CommonModule,
    HomeworkRoutingModule
  ]
})
export class HomeworkModule { }
