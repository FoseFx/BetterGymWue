import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BaseService} from './base.service';
import {LoginComponent} from '../c/login/login.component';
import {ShowComponent} from '../c/show/show.component';
@Injectable()
export class GuardService implements CanActivate {

  constructor(private baseService: BaseService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.baseService.acceptedAGB) {
      this.router.navigate(['/agb'], {queryParams: {ua: ''}});
      return false;
    }
    if (route.component !== LoginComponent) {
      if (!this.baseService.credentials) {
        this.router.navigate(['/']);
        return false;
      }
    }
    if(route.component === ShowComponent){
      if(!this.baseService.myKurse){
        this.router.navigate(['/']);
      }
    }
    return true;
  }
}
