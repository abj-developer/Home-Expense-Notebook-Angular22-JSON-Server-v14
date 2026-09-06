import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MockApiService } from './core/mock-api.service';

@Component({
  selector: 'hen-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly api = inject(MockApiService);
  readonly selectedMonth = this.api.selectedMonth;
  readonly monthOptions = this.buildMonthOptions();

  onMonthChange(month: string): void {
    this.api.setSelectedMonth(month);
  }

  private buildMonthOptions(): { key: string; label: string }[] {
    const now = new Date();
    return Array.from({ length: 24 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(date);
      return { key, label };
    });
  }
}
