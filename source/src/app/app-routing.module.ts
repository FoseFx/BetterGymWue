import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./c/login/login.component";
import {GuardService} from "./s/guard.service";
import {AgbComponent} from "./c/agb/agb.component";
import {SelectComponent} from "./c/select/select.component";
import {ShowComponent} from "./c/show/show.component";
import {CloudComponent} from "./c/cloud/cloud.component";
import {AboutComponent} from "./c/about/about.component";
import {StundenplanComponent} from "./c/stundenplan/stundenplan.component";
import {ErrorComponent} from "./c/error/error.component";
import {AssistantComponent} from "./c/assistant/assistant.component";

const routes: Routes =  [
  {path: '', component: LoginComponent, canActivate: [GuardService] },
  {path: 'agb', component: AgbComponent },
  {path: 'select', component: SelectComponent, canActivate: [GuardService]},
  {path: 'show', component: ShowComponent, canActivate: [GuardService]},
  {path: 'cloud', component: CloudComponent, canActivate: [GuardService]},
  {path: 'about', component: AboutComponent},
  {path: 'stundenplan', component: StundenplanComponent, canActivate: [GuardService]},
  {path: 'assistant', component: AssistantComponent, canActivate: [GuardService]},
  {path: 'help', loadChildren: "app/help/help.module#HelpModule"},
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
