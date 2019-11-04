import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./main/c/login/login.component";
import {GuardService} from "./main/s/guard.service";
import {AgbComponent} from "./main/c/agb/agb.component";
import {SelectComponent} from "./main/c/select/select.component";
import {ShowComponent} from "./main/c/show/show.component";
import {AboutComponent} from "./main/c/about/about.component";
import {StundenplanComponent} from "./main/c/stundenplan/stundenplan.component";
import {ErrorComponent} from "./main/c/error/error.component";

const routes: Routes =  [
  {path: '', component: LoginComponent, canActivate: [GuardService] },
  {path: 'agb', component: AgbComponent },
  {path: 'select', component: SelectComponent, canActivate: [GuardService]},
  {
    path: 'show',
    canActivate: [GuardService],
    children: [
      {path: '', component: ShowComponent},
      {path: 'non-kurse', loadChildren: () => import('app/verifynotkurse/verifynotkurse.module').then(m => m.VerifynotkurseModule)}
    ]
  },
  {path: 'about', component: AboutComponent},
  {path: 'stundenplan', component: StundenplanComponent, canActivate: [GuardService]},
  // {path: 'homework', loadChildren: () => import('app/homework/homework.module').then(m => m.HomeworkModule)},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
