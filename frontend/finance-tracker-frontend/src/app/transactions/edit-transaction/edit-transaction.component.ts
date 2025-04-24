import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './edit-transaction.component.html',
})
export class EditTransactionComponent implements OnInit {
  transactionId!: number;
  amount = '';
  description = '';
  category: number | null = null;
  categories: any[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionId = Number(this.route.snapshot.paramMap.get('id'));

    this.http
      .get(`http://localhost:8000/api/transactions/${this.transactionId}/`)
      .subscribe({
        next: (res: any) => {
          this.amount = res.amount;
          this.description = res.description;
          this.category = res.category;
        },
        error: () => {
          this.error = 'Не удалось загрузить транзакцию';
        },
      });

    this.http.get('http://localhost:8000/api/categories/').subscribe({
      next: (res: any) => (this.categories = res),
      error: () => {
        this.error = 'Ошибка загрузки категорий';
      },
    });
  }
  onSubmit() {
    const userId = Number(localStorage.getItem('user_id'));

    const data = {
      id: this.transactionId,
      user: userId,
      category: this.category,
      amount: this.amount,
      description: this.description,
    };

    this.http
      .put(
        `http://localhost:8000/api/transactions/${this.transactionId}/`,
        data
      )
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => {
          this.error = err.error?.detail || 'Ошибка при обновлении транзакции';
          console.error('Ответ от сервера:', err);
        },
      });
  }
}
