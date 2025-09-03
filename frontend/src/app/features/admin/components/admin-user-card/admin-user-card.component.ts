import { Component, effect, inject, input, signal } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user.model';
import { AdminService } from '../../admin.service';
import { Product } from '../../../../shared/models/product.model';
import { ProductListComponent } from '../../../products/components/product-list/product-list.component';

@Component({
  selector: 'app-admin-user-card',
  imports: [],
  templateUrl: './admin-user-card.component.html',
  styleUrl: './admin-user-card.component.scss'
})
export class AdminUserCardComponent {
  user = input<UserResponse>();

  likedProducts = signal<Product[]>([]);

  adminService = inject(AdminService);

  selected = signal(false);
  onSelect(){
    this.selected.set(!this.selected());
  }

  loadLikedProductsEffect = effect(() => {
    var userId = this.user()?.userId;
    this.adminService.getLikedProductsObjs({userId: userId!}).subscribe({
      next: (data) => {
        console.log(data.likedProductObjs)
        this.likedProducts.set(data.likedProductObjs);
      },
      error: (err) => {
        console.error(`Issue loading products for user: ${userId}`, err);
      }
    });
  })
}
