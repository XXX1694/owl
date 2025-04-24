import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  transactions: any[] = [];
  loading = true;

  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.http.get('http://localhost:8000/api/transactions/').subscribe({
      next: (data: any) => {
        console.log('Пришло:', data); // ← проверь здесь
        this.transactions = data;
        this.calculateStats();
        this.loading = false;
      },
    });
  }

  calculateStats() {
    this.totalIncome = 0;
    this.totalExpense = 0;

    this.transactions.forEach((t) => {
      const isIncome = t.category_obj?.is_income;
      const amount = Number(t.amount);

      if (isIncome === true) {
        this.totalIncome += amount;
      } else if (isIncome === false) {
        this.totalExpense += amount;
      } else {
        console.warn('Категория без типа:', t);
      }
    });

    this.balance = this.totalIncome - this.totalExpense;
  }

  deleteTransaction(id: number) {
    if (confirm('Удалить эту транзакцию?')) {
      this.http
        .delete(`http://localhost:8000/api/transactions/${id}/`)
        .subscribe({
          next: () => {
            this.transactions = this.transactions.filter((t) => t.id !== id);
            this.calculateStats();
          },
          error: (err) => console.error('Ошибка удаления', err),
        });
    }
  }
}
