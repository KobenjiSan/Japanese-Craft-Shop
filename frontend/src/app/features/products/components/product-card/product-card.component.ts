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
  };

  // Dynamic Sizing Logic
  size = input<'small' | 'default' | 'large'>('default');

  sizeMap = {
    small: {
      mainWidth: 'w-28 2xl:w-48',
      imgHeight: 'h-28 2xl:h-48',
      heartSize: 'w-6 h-6 2xl:w-7 2xl:h-7',
      titleSize: 'text-lg 2xl:text-xl',
      catSize: 'text-xs 2xl:text-md',
      priceSize: 'text-sm 2xl:text-lg',
    },
    default: {
      mainWidth: 'w-40 2xl:w-60',
      imgHeight: 'h-40 2xl:h-60',
      heartSize: 'w-7 h-7 2xl:w-8 2xl:h-8',
      titleSize: 'text-xl',
      catSize: 'text-md',
      priceSize: 'text-xl',
    },
    large: {
      mainWidth: 'w-56 2xl:w-72',
      imgHeight: 'h-56 2xl:h-72',
      heartSize: 'w-8 h-8 2xl:w-9 2xl:h-9',
      titleSize: 'text-2xl',
      catSize: 'text-xl',
      priceSize: 'text-xl',
    }
  };

  get sizeConfig(){
    return this.sizeMap[this.size()];
  }
}
