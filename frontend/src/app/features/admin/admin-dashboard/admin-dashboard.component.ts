import { Component } from '@angular/core';
import { AdminNavColumnComponent } from '../components/admin-nav-column/admin-nav-column.component';
import { AdminProductDisplayComponent } from '../components/admin-product-display/admin-product-display.component';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    AdminNavColumnComponent,
    AdminProductDisplayComponent,
    AdminHeaderComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
