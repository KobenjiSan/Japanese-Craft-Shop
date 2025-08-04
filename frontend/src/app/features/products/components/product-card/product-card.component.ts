import { Component, input, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input<Product>();

  isLiked = signal(false); // To be changed to update by user

  toggleLiked(event: MouseEvent){
    event.stopPropagation();
    this.isLiked.set(!this.isLiked())
  }
}
