import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/users/';
  private isBrowser: boolean;

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser && this.getToken()) {
      this.isLoggedIn$.next(true);
    }
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string; user_id: number }>(`${this.apiUrl}login/`, data)
      .pipe(
        tap((res) => {
          if (this.isBrowser) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user_id', res.user_id.toString()); // 💥 важно: .toString()
          }
          this.isLoggedIn$.next(true);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  register(data: {
    username: string;
    email: string;
    password: string;
    password2: string;
  }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}register/`, data)
      .pipe(
        tap((res) => {
          if (this.isBrowser) {
            localStorage.setItem('token', res.token);
          }
          this.isLoggedIn$.next(true);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
