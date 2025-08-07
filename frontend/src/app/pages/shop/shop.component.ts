import { Component } from '@angular/core';
import { ProductDisplayComponent } from '../../features/products/product-display/product-display.component';

@Component({
  selector: 'app-shop',
  imports: [ProductDisplayComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

}
