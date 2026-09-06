import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MockApiService } from '../../core/mock-api.service';
import { MajorCategory, MinorCategory } from '../../models/expense.models';

@Component({ selector: 'hen-categories', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './categories.component.html' })
export class CategoriesComponent {
  private readonly api = inject(MockApiService);
  readonly categories = toSignal(this.api.getMajorCategories(), { initialValue: [] as MajorCategory[] });
  readonly minors = toSignal(this.api.getMinorCategories(), { initialValue: [] as MinorCategory[] });
  readonly grouped = computed(() => this.categories().map(category => ({ category, minors: this.minors().filter(m => m.majorCategoryId === category.id) })));
  showMajor = false; showMinor = false; selectedMajorId = 1; majorName = ''; minorName = '';

  createMajor(): void { const name = this.majorName.trim(); if (!name) return; this.api.addMajorCategory(name).subscribe(() => { this.majorName = ''; this.showMajor = false; }); }
  openMinor(id: number): void { this.selectedMajorId = id; this.minorName = ''; this.showMinor = true; }
  createMinor(): void { const name = this.minorName.trim(); if (!name) return; this.api.addMinorCategory(this.selectedMajorId, name).subscribe(() => { this.minorName = ''; this.showMinor = false; }); }
  majorNameById(): string { return this.categories().find(c => c.id === this.selectedMajorId)?.name ?? ''; }
}
