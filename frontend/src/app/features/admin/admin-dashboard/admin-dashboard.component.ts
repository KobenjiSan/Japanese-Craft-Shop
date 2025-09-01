import { Component, inject, signal } from '@angular/core';
import { AdminNavColumnComponent } from '../components/admin-nav-column/admin-nav-column.component';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  imports: [
    AdminNavColumnComponent,
    AdminHeaderComponent,
    RouterOutlet
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  router = inject(Router);

  currentPage = signal<string>('products');

  setCurrentPage(page: string){
    this.currentPage.set(page);
    this.router.navigate(['/admin', page]);
  }
}
