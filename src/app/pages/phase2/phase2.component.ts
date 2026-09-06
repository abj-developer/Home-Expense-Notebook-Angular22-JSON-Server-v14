import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'hen-phase2', standalone: true, template: `<section class="page narrow-page"><div class="phase2-page"><div class="phase2-icon big">◷</div><h1>Phase 2 Feature</h1><p>This screen is intentionally kept for Phase 2.</p><p>Recent expenses, expense distribution charts, editing/deleting expenses, reports and other insights will be added later.</p><a routerLink="/" class="primary-button">← Back to Dashboard</a></div></section>`, imports: [RouterLink] })
export class Phase2Component {}
