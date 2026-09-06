import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Expense, ExpenseRequest, MajorCategory, MinorCategory } from '../models/expense.models';
import { API_BASE_URL } from './api-config';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL.replace(/\/$/, '');

  readonly selectedMonth = signal(this.currentMonthKey());

  private readonly major$ = new BehaviorSubject<MajorCategory[]>([]);
  private readonly minor$ = new BehaviorSubject<MinorCategory[]>([]);
  private readonly expenses$ = new BehaviorSubject<Expense[]>([]);

  constructor() {
    this.refreshData();
  }

  setSelectedMonth(month: string): void {
    if (/^\d{4}-\d{2}$/.test(month)) this.selectedMonth.set(month);
  }

  getMajorCategories(): Observable<MajorCategory[]> { return this.major$.asObservable(); }
  getMinorCategories(): Observable<MinorCategory[]> { return this.minor$.asObservable(); }
  getExpenses(): Observable<Expense[]> { return this.expenses$.asObservable(); }

  refreshData(): void {
    this.http.get<MajorCategory[]>(`${this.baseUrl}/majorCategories`).pipe(map(items => items.map(this.normalizeMajor))).subscribe(items => this.major$.next(items));
    this.http.get<MinorCategory[]>(`${this.baseUrl}/minorCategories`).pipe(map(items => items.map(this.normalizeMinor))).subscribe(items => this.minor$.next(items));
    this.http.get<Expense[]>(`${this.baseUrl}/expenses`).pipe(map(items => items.map(this.normalizeExpense))).subscribe(items => this.expenses$.next(items));
  }

  addMajorCategory(name: string): Observable<MajorCategory> {
    const payload = { name: name.trim(), icon: '✦', accent: 'blue' };
    return this.http.post<MajorCategory>(`${this.baseUrl}/majorCategories`, payload).pipe(
      map(this.normalizeMajor),
      tap(category => this.major$.next([...this.major$.value, category]))
    );
  }

addMinorCategory(majorCategoryId: number, name: string): Observable<MinorCategory> {
  const nextId =
    this.minor$.value.reduce(
      (max, item) => Math.max(max, Number(item.id) || 0),
      0
    ) + 1;
  const payload = {
    id: nextId,
    majorCategoryId: Number(majorCategoryId),
    name: name.trim()
  };
  return this.http.post<MinorCategory>(
    `${this.baseUrl}/minorCategories`,
    payload
  ).pipe(
    map(this.normalizeMinor),
    tap(category =>
      this.minor$.next([...this.minor$.value, category])
    )
  );
}

  addExpense(request: ExpenseRequest): Observable<Expense> {
    const payload = {
      majorCategoryId: Number(request.majorCategoryId),
      minorCategoryId: Number(request.minorCategoryId),
      amount: Number(request.amount),
      date: request.date,
      description: request.description ?? ''
    };
    return this.http.post<Expense>(`${this.baseUrl}/expenses`, payload).pipe(
      map(this.normalizeExpense),
      tap(expense => this.expenses$.next([expense, ...this.expenses$.value]))
    );
  }

  private normalizeMajor = (item: MajorCategory): MajorCategory => ({ ...item, id: Number(item.id) });
  private normalizeMinor = (item: MinorCategory): MinorCategory => ({ ...item, id: Number(item.id), majorCategoryId: Number(item.majorCategoryId) });
  private normalizeExpense = (item: Expense): Expense => ({ ...item, id: Number(item.id), majorCategoryId: Number(item.majorCategoryId), minorCategoryId: Number(item.minorCategoryId), amount: Number(item.amount) });

  private currentMonthKey(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }
}
