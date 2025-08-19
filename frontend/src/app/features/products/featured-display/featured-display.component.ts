import { Component, effect, inject, signal } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../product.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Component({
  selector: 'app-featured-display',
  imports: [ProductCardComponent],
  templateUrl: './featured-display.component.html',
  styleUrl: './featured-display.component.scss'
})
export class FeaturedDisplayComponent {
  
  products = signal<Product[]>([]);

  productService = inject(ProductService);

  readonly loadProductsEffect = effect(() => {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data.items)
      },
      error: (err) => {
        console.error("Error fetching chapters", err);
      }
    });
  });
}
