import { Component, output, signal } from '@angular/core';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { ProductCreateFormComponent } from '../product-create-form/product-create-form.component';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-create-display',
  imports: [
    ProductCardComponent,
    ProductCreateFormComponent
  ],
  templateUrl: './product-create-display.component.html',
  styleUrl: './product-create-display.component.scss'
})
export class ProductCreateDisplayComponent {
  exampleProduct = signal<Product | null>(null);

  createdRefreshTick = signal(0);

  onProductCreated(){
    this.createdRefreshTick.update(v => v + 1);
    this.productCreated.emit();
  }

  productCreated = output();
  closeWindow = output();

  onCloseWindow(){
    this.closeWindow.emit();
  }
}
