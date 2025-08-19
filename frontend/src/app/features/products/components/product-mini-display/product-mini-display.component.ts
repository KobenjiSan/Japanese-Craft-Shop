import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { AdminService } from '../../../admin/admin.service';
import { LikedByListDisplayComponent } from '../liked-by-list-display/liked-by-list-display.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-mini-display',
  imports: [
    UpperCasePipe,
    DatePipe,
    LikedByListDisplayComponent,
  ],
  templateUrl: './product-mini-display.component.html',
  styleUrl: './product-mini-display.component.scss'
})
export class ProductMiniDisplayComponent {
  product = input<Product>();
  deleted = output();

  auth = inject(AuthService);
  adminService = inject(AdminService);
  toastr = inject(ToastrService);

  onDelete(){
    const product = this.product();
    if(!product) return;

    const confirm = window.confirm(`Are you sure you want to delete ${product.title}?`);
    if(!confirm) return;

    this.adminService.deleteProduct(product.id).subscribe({
      next: () => {
        this.toastr.success(`Deleted: ${this.product()?.title}`)
        this.deleted.emit();
      },
      error: (err) => {
        console.error(`Failed to delete ${product.title}.`, err);
      }
    });
  }
}
