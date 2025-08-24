import { Component, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../../products/product.service';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-most-liked-product-card',
  imports: [],
  templateUrl: './most-liked-product-card.component.html',
  styleUrl: './most-liked-product-card.component.scss'
})
export class MostLikedProductCardComponent {
  productService = inject(ProductService);

  product = signal<Product | null>(null);

  getProduct = effect(() => {

    this.productService.getMostLikedProduct().subscribe({
      next: (product) => {
        this.product.set(product);
      },
      error: (err) => {}
    });
  });
}
