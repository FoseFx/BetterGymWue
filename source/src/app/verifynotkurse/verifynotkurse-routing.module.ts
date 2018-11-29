import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VerifynotkurseComponent} from "./verifynotkurse.component";

const routes: Routes = [{
  path: '', component: VerifynotkurseComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VerifynotkurseRoutingModule { }
