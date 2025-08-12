import { Component } from '@angular/core';
import { ProductDisplayComponent } from '../../products/product-display/product-display.component';
import { FilterColumnComponent } from '../components/filter-column/filter-column.component';
import { CategoryNavComponent } from '../components/category-nav/category-nav.component';

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
  
}
