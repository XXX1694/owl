// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/profile/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user, {
      headers: this.getHeaders(),
    });
  }
}
