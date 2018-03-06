import {Routes} from '@angular/router';
import {AgbComponent} from './c/agb/agb.component';
import {LoginComponent} from './c/login/login.component';
import {GuardService} from './s/guard.service';
import {SelectComponent} from './c/select/select.component';
import {ShowComponent} from './c/show/show.component';
import {CloudComponent} from './c/cloud/cloud.component';
import {AboutComponent} from './c/about/about.component';

export const routes: Routes =  [
  {path: '', component: LoginComponent, canActivate: [GuardService] },
  {path: 'agb', component: AgbComponent },
  {path: 'select', component: SelectComponent, canActivate: [GuardService]},
  {path: 'show', component: ShowComponent, canActivate: [GuardService]},
  {path: 'cloud', component: CloudComponent, canActivate: [GuardService]},
  {path: 'about', component: AboutComponent},
];
