import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { FilteredProducts } from '../../../shared/models/filtered-products.model';
import { ProductService } from '../product.service';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductMiniDisplayComponent } from '../components/product-mini-display/product-mini-display.component';

@Component({
  selector: 'app-product-list-display',
  imports: [
    ProductListComponent,
    ProductMiniDisplayComponent,
  ],
  templateUrl: './product-list-display.component.html',
  styleUrl: './product-list-display.component.scss'
})
export class ProductListDisplayComponent {
  createdRefreshTick = input<number>(0);

  products = signal<Product[]>([]);

  selectedProduct = signal<Product | null>(null);
  updateSelected(selected: Product){
    this.selectedProduct.set(selected);
  }

  checkSelected(id: string): boolean{
    if(id === this.selectedProduct()?.id){
      return true;
    } else {
      return false;
    }
  }

  filters = input<FilteredProducts>();

  currentPage = signal(1);
  pageSize = signal(25);
  totalPages = signal(1);

  productService = inject(ProductService);

  readonly loadProductsEffect = effect(() => {
    this.createdRefreshTick();
    this.productDeleted();

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
        // TODO: add ToastR error
      }
    });
  });

  productDeleted = signal(0);
  
  onDeleteProduct(){
    this.productDeleted.update(v => v + 1);
    this.selectedProduct.set(null);
  }
}
