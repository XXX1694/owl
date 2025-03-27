import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000/api/categories/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, {
      headers: this.getHeaders(),
    });
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}${category.id}/`, category, {
      headers: this.getHeaders(),
    });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, {
      headers: this.getHeaders(),
    });
  }
}
