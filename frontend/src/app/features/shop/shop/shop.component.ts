import { Component, signal } from '@angular/core';
import { ProductDisplayComponent } from '../../products/product-display/product-display.component';
import { FilterColumnComponent } from '../components/filter-column/filter-column.component';
import { CategoryNavComponent } from '../components/category-nav/category-nav.component';
import { FilteredProducts } from '../../../shared/models/filtered-products.model';

@Component({
  selector: 'app-shop',
  imports: [
    ProductDisplayComponent,
    FilterColumnComponent,
    CategoryNavComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  
  filters = signal<FilteredProducts>({
    category : '',
    minPrice : 0,
    maxPrice : 150,
    byNewest : false,
    byStock : false,
    byFeatured : false
  });

  onSetCategory(category: string){
    this.filters.update(f => ({
      ...f,
      category: category
    }));
  }

  onSetMinPrice(minPrice: number){
    this.filters.update(f => ({
      ...f,
      minPrice: minPrice
    }));
  }

  onSetMaxPrice(maxPrice: number){
    this.filters.update(f => ({
      ...f,
      maxPrice: maxPrice
    }));
  }

  onSetNewFilter(toggle: boolean){
    this.filters.update(f => ({
      ...f,
      byNewest: toggle
    }));
  }

  onSetStockFilter(toggle: boolean){
    this.filters.update(f => ({
      ...f,
      byStock: toggle
    }));
  }

  onSetFeaturedFilter(toggle: boolean){
    this.filters.update(f => ({
      ...f,
      byFeatured: toggle
    }));
  }
}
