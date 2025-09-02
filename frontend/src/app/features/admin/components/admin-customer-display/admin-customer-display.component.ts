import { Component, effect, inject, signal } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user.model';
import { AdminService } from '../../admin.service';
import { AdminUserCardComponent } from '../admin-user-card/admin-user-card.component';

@Component({
  selector: 'app-admin-customer-display',
  imports: [
    AdminUserCardComponent,
  ],
  templateUrl: './admin-customer-display.component.html',
  styleUrl: './admin-customer-display.component.scss'
})
export class AdminCustomerDisplayComponent {
  users = signal<UserResponse[]>([]);

  currentPage = signal(1);
  pageSize = signal(3);
  totalPages = signal(1);

  adminService = inject(AdminService);

  readonly loadUsersEffect = effect(() => {
    const current = this.currentPage();
    const size = this.pageSize();

    this.adminService.getAllUsers({page: current, pageSize: size,}).subscribe({
      next: (data) => {
        this.users.set(data.items);
        this.totalPages.set(data.totalPages);
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    })
  });

  goToNextPage(){
    if(this.currentPage() < this.totalPages()){
      this.currentPage.update(p => p + 1)
    }
  }

  goToPreviousPage(){
    if(this.currentPage() > 1){
      this.currentPage.update(p => p - 1)
    }
  }

}
