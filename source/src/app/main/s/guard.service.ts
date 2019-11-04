import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BaseService} from './base/base.service';
import {LoginComponent} from '../c/login/login.component';
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
    if(/\/show$/.test(state.url) || route.component === StundenplanComponent){
      if(!this.baseService.myKurse){
        this.router.navigate(['/']);
        return false;
      }
    }

    if(/\/show$/.test(state.url)){
      if(false){
        this.router.navigate(['/show/non-kurse']);
        return false;
      }
    }
    if(this.baseService.dead){
      this.router.navigate(['/error'], {queryParams: {'dead': true}});
      return false;
    }

    return true;
  }
}
