import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter((cat) => cat.id !== id);
    });
  }
}
