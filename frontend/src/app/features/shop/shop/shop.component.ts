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
    console.log('category', category);
  }

  onSetMinPrice(minPrice: number){
    console.log('min price', minPrice);
  }

  onSetMaxPrice(maxPrice: number){
    console.log('max price', maxPrice);
  }

  onSetNewFilter(toggle: boolean){
    console.log('filter newest', toggle);
  }

  onSetStockFilter(toggle: boolean){
    console.log('filter stock', toggle);
  }

  onSetFeaturedFilter(toggle: boolean){
    console.log('filter featured', toggle);
  }
}
