import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-favorite-list-card',
  imports: [],
  templateUrl: './product-favorite-list-card.component.html',
  styleUrl: './product-favorite-list-card.component.scss'
})
export class ProductFavoriteListCardComponent {
  product = input<Product>();
  router = inject(Router);

  onLink(){
    this.router.navigate(['/product', this.product()?.id]);
  }
}
