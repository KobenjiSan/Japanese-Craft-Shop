import { Component, effect, inject, signal } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../product.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Component({
  selector: 'app-product-display',
  imports: [ProductCardComponent],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {
  products = signal<Product[]>([]);

  productService = inject(ProductService);

  readonly loadProductsEffect = effect(() => {
    this.productService.getAllProducts().subscribe({
      next: (data) => {this.products.set(data)},
      error: (err) => {
        console.error("Error fetching chapters", err);
        // TODO: add ToastR error
      }
    });
  });
}
