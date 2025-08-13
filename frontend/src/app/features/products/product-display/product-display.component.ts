import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../product.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilteredProducts } from '../../../shared/models/filtered-products.model';

@Component({
  selector: 'app-product-display',
  imports: [ProductCardComponent],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {
  products = signal<Product[]>([]);

  filters = input<FilteredProducts>();

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
