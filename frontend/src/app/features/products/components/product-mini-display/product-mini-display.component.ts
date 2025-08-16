import { Component, input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-mini-display',
  imports: [
    UpperCasePipe,
    DatePipe,
  ],
  templateUrl: './product-mini-display.component.html',
  styleUrl: './product-mini-display.component.scss'
})
export class ProductMiniDisplayComponent {
  product = input<Product>();
}
