import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MockApiService } from '../../core/mock-api.service';
import { Expense, MajorCategory, MinorCategory } from '../../models/expense.models';

@Component({
  selector: 'hen-category-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent {
  private readonly api = inject(MockApiService);
  private readonly route = inject(ActivatedRoute);

  readonly categories = toSignal(this.api.getMajorCategories(), { initialValue: [] as MajorCategory[] });
  readonly minors = toSignal(this.api.getMinorCategories(), { initialValue: [] as MinorCategory[] });
  readonly expenses = toSignal(this.api.getExpenses(), { initialValue: [] as Expense[] });
  readonly categoryId = Number(this.route.snapshot.paramMap.get('id'));
  readonly selectedMonth = this.api.selectedMonth;
  readonly monthLabel = computed(() => {
    const [year, month] = this.selectedMonth().split('-').map(Number);
    return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1));
  });
  readonly category = computed(() => this.categories().find(c => c.id === this.categoryId));
  readonly categoryExpenses = computed(() => this.expenses().filter(e => e.majorCategoryId === this.categoryId && e.date.startsWith(this.selectedMonth())));
  readonly total = computed(() => this.categoryExpenses().reduce((sum, expense) => sum + expense.amount, 0));
  readonly minorGroups = computed(() => {
    const categoryMinors = this.minors().filter(m => m.majorCategoryId === this.categoryId);
    return categoryMinors.map(minor => {
      const expenses = this.categoryExpenses().filter(e => e.minorCategoryId === minor.id);
      return { minor, expenses, total: expenses.reduce((sum, expense) => sum + expense.amount, 0) };
    }).filter(group => group.expenses.length > 0);
  });

  minorName(minorId: number): string {
    return this.minors().find(m => m.id === minorId)?.name ?? 'Unknown';
  }
}
