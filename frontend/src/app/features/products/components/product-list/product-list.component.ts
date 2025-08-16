import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    DatePipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  product = input<Product>();
  outputProduct = output<Product>();

  selected = input<boolean>(false);

  onSelect(){
    this.outputProduct.emit(this.product()!);
  }
}
