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
  pageSize = signal(8);
  totalPages = signal(1);

  productService = inject(ProductService);

  readonly loadProductsEffect = effect(() => {
    this.createdRefreshTick();
    this.productsRefresh();

    const current = this.currentPage();
    const size = this.pageSize();

    this.productService.getAllProducts({
      page: current,
      pageSize: size,
    }).subscribe({
      next: (data) => {
        this.products.set(data.items);
        this.totalPages.set(data.totalPages);
      },
      error: (err) => {
        console.error("Error fetching chapters", err);
        // TODO: add ToastR error
      }
    });
  });

  productsRefresh = signal(0);
  
  onDeleteProduct(){
    this.productsRefresh.update(v => v + 1);
    this.selectedProduct.set(null);
  }

  onUpdatedProduct(){
    this.productsRefresh.update(v => v + 1);
  }

  goToNextPage(){
    if(this.currentPage() < this.totalPages()){
      this.currentPage.update(p => p + 1)
    }
  }

  goToPreviousPage(){
    if(this.currentPage() > 1){
      this.currentPage.update(p => p - 1)
    }
  }
}
