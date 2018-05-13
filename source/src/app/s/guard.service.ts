import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {LoginComponent} from '../c/login/login.component';
import {ShowComponent} from '../c/show/show.component';
import {CloudComponent} from '../c/cloud/cloud.component';
import {StundenplanComponent} from '../c/stundenplan/stundenplan.component';
@Injectable()
export class GuardService implements CanActivate {

  constructor(private baseService: BaseService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.baseService.acceptedAGB) {
      this.router.navigate(['/agb']);
      return false;
    }
    if (route.component !== LoginComponent) {
      if (!this.baseService.credentials) {
        this.router.navigate(['/']);
        return false;
      }
    }
    if(route.component === ShowComponent || route.component === StundenplanComponent || route.component === CloudComponent){
      if(!this.baseService.myKurse){
        this.router.navigate(['/']);
      }
    }
/*    if(route.component === CloudComponent){
      if(!this.baseService.kursID) this.router.navigate(['/']);
    }
*/
    return true;
  }
}