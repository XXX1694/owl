import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './add-transaction.component.html',
})
export class AddTransactionComponent implements OnInit {
  amount: number = 0;
  description: string = '';
  category: number | null = null;
  categories: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/categories/').subscribe({
      next: (res: any) => (this.categories = res),
      error: () => (this.error = 'Не удалось загрузить категории'),
    });
  }

  onSubmit() {
    if (!this.category || this.amount <= 0) {
      this.error = 'Заполните все поля корректно';
      return;
    }

    const data = {
      amount: this.amount,
      description: this.description,
      category: this.category,
    };

    this.http.post('http://localhost:8000/api/transactions/', data).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = 'Ошибка при добавлении';
        console.error(err);
      },
    });
  }
}
