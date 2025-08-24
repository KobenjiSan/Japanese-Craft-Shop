import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-product-favorite-list-card',
  imports: [],
  templateUrl: './product-favorite-list-card.component.html',
  styleUrl: './product-favorite-list-card.component.scss'
})
export class ProductFavoriteListCardComponent {
  product = input<Product>();
  router = inject(Router);

  requestRefresh = output();

  onLink(){
    this.router.navigate(['/product', this.product()?.id]);
  }

  auth = inject(AuthService);
  onRemove(){
    this.auth.likeProduct(this.product()!.id).subscribe({
      next: (result) => {
        this.requestRefresh.emit();
      },
      error: (err) => {
        console.error(err)
      }
    });
  }
}
