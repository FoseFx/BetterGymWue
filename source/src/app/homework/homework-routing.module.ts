import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowHomeworkComponent} from "./c/show-homework/show-homework.component";

const routes: Routes = [
	{path: '', component: ShowHomeworkComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworkRoutingModule { }
