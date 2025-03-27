import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8000/api/expenses/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}${id}/`, {
      headers: this.getHeaders(),
    });
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, {
      headers: this.getHeaders(),
    });
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}${expense.id}/`, expense, {
      headers: this.getHeaders(),
    });
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, {
      headers: this.getHeaders(),
    });
  }
}
