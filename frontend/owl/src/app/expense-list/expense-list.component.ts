import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  displayedColumns: string[] = [
    'amount',
    'category',
    'date',
    'description',
    'actions',
  ];
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService
      .getExpenses()
      .subscribe((data) => (this.expenses = data));
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.expenses = this.expenses.filter((exp) => exp.id !== id);
    });
  }
}
