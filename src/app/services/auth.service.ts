import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasSession());
  isLoggedIn$ = this.loggedIn.asObservable();

  private hasSession(): boolean {
    return !!sessionStorage.getItem('currentUserSession');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    sessionStorage.removeItem('currentUserSession');
    this.loggedIn.next(false);
  }
}
