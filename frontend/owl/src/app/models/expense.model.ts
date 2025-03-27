import { Category } from './category.model';

export interface Expense {
  id?: number;
  amount: number;
  category: string | Category;
  date: string;
  description?: string;
}
