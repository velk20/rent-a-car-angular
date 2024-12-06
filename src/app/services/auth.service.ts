import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    const user = localStorage.getItem('user');
    this.userSubject.next(user ? JSON.parse(user) : null);
  }

  login(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}
