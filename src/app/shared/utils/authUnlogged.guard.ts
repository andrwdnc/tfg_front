import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUnlogged implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isUserAuthenticated = localStorage.getItem("session")
    if (isUserAuthenticated) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }
}
