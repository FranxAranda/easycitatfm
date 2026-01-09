import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
      <button *ngIf="true">Logout</button>
    </nav>
  `
})
export class HeaderComponent {}
