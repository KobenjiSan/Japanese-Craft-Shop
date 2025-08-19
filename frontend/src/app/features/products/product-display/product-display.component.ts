import { Component, computed, effect, inject, input, signal } from '@angular/core';
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

  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(1);

  productService = inject(ProductService);

  readonly loadProductsEffect = effect(() => {
    const current = this.currentPage();
    const size = this.pageSize();
    const category = this.filters()?.category;
    const minPrice = this.filters()?.minPrice;
    const maxPrice = this.filters()?.maxPrice;
    const byNewest = this.filters()?.byNewest;
    const byStock = this.filters()?.byStock;
    const byFeatured = this.filters()?.byFeatured;

    this.productService.getAllProducts({
      page: current,
      pageSize: size,
      category: category,
      minPrice: minPrice,
      maxPrice: maxPrice,
      stock: byStock,
      featured: byFeatured,
      newest: byNewest
    }).subscribe({
      next: (data) => {
        this.products.set(data.items);
      },
      error: (err) => {
        console.error("Error fetching chapters", err);
      }
    });
  });
}
