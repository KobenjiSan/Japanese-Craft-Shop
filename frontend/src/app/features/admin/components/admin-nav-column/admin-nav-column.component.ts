import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-nav-column',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-nav-column.component.html',
  styleUrl: './admin-nav-column.component.scss'
})
export class AdminNavColumnComponent {
  router = inject(Router);
}
