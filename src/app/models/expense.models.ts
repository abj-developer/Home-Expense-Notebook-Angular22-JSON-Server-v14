export interface MajorCategory {
  id: number;
  name: string;
  icon: string;
  accent: string;
  description?: string;
}

export interface MinorCategory {
  id: number;
  majorCategoryId: number;
  name: string;
}

export interface Expense {
  id: number;
  majorCategoryId: number;
  minorCategoryId: number;
  amount: number;
  date: string;
  description: string;
}

export interface ExpenseRequest {
  majorCategoryId: number;
  minorCategoryId: number;
  amount: number;
  date: string;
  description: string;
}
