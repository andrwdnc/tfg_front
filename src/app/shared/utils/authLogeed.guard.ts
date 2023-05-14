import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogged implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isUserAuthenticated = localStorage.getItem("session")
    if (isUserAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
