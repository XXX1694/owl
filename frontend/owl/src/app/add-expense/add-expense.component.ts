// add-expense.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  expense: Expense = { amount: 0, category: '', date: '', description: '' };

  constructor(private expenseService: ExpenseService, private router: Router) {}

  addExpense() {
    this.expenseService.addExpense(this.expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => console.error('Add failed', err),
    });
  }
}
