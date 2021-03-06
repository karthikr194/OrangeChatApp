import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private _authGuard: AuthGuard) {}
  // example use of guard
  //  { path: 'special', component: SpecialPage, canActivate: [AuthGuard] },

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //const loggedIn = false; // replace with actual user auth checking logic
    let user = localStorage.getItem('loggedIn');
     console.log({user});
      if (!user) {
        //if()
        this.router.navigate(['/signup'], { skipLocationChange: true });

      }

      return true;
    
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  //   return this._authGuard.canActivate(route, state).then((auth: boolean) => {
  //     if(!auth) {
  //       return false;
  //       console.log('llsllslsl');
  //     }
  //     //... your role guard check code goes here
  //   });
  // }

}
