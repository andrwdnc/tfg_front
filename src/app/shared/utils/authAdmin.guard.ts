import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isUserAuthenticated = localStorage.getItem("session")
    if(atob(JSON.parse(localStorage.getItem('session') ?? '').type)==="Admin"){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}