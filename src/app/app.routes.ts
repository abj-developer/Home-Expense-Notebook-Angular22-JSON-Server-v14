import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard | Home Expense Notebook',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'category/:id',
    title: 'Category Details | Home Expense Notebook',
    loadComponent: () => import('./pages/category-detail/category-detail.component').then((m) => m.CategoryDetailComponent)
  },
  {
    path: 'categories',
    title: 'Categories | Home Expense Notebook',
    loadComponent: () => import('./pages/categories/categories.component').then((m) => m.CategoriesComponent)
  },
  {
    path: 'expenses',
    title: 'Expenses | Home Expense Notebook',
    loadComponent: () => import('./pages/phase2/phase2.component').then((m) => m.Phase2Component)
  },
  {
    path: 'reports',
    title: 'Reports | Home Expense Notebook',
    loadComponent: () => import('./pages/phase2/phase2.component').then((m) => m.Phase2Component)
  },
  {
    path: 'settings',
    title: 'Settings | Home Expense Notebook',
    loadComponent: () => import('./pages/phase2/phase2.component').then((m) => m.Phase2Component)
  },
  { path: '**', redirectTo: '' }
];
