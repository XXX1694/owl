import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  totalSpent: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
      this.totalSpent = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    });
  }
}
