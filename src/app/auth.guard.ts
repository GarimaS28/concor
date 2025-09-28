import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = sessionStorage.getItem('concorUser');
    if (user) {
      // User is logged in, block navigation to login
      this.router.navigate(['/']); // Redirect to default dashboard if needed
      return false;
    }
    return true; // Allow access if not logged in
  }
}
