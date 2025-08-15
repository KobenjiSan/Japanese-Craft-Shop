import { Component, signal } from '@angular/core';
import { ProductCreateFormComponent } from '../product-create-form/product-create-form.component';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-admin-product-display',
  imports: [
    ProductCreateFormComponent,
    ProductCardComponent,
  ],
  templateUrl: './admin-product-display.component.html',
  styleUrl: './admin-product-display.component.scss'
})
export class AdminProductDisplayComponent {
  exampleProduct = signal<Product | null>(null);
}
