import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
    NgClass,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input<Product>();

  auth = inject(AuthService);
  router = inject(Router);

  isLiked = signal(false); // To be changed to update by user

  toggleLiked(event: MouseEvent): any{
    event.stopPropagation();

    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);;
      return;
    }

    this.auth.likeProduct(this.product()?.id!).subscribe({
      next: (res) => {
        this.isLiked.set(res.valueOf());
      },
      error: (err) => {
        console.error(`failed to like product ${this.product()?.title}`, err)
      }
    });
  };

  // Dynamic Sizing Logic
  // TODO: look into ngClass
  size = input<'small' | 'default' | 'large'>('default');

  sizeClasses = computed(() => {
    switch(this.size()){
      case 'small':
        return 'bg-blue-500';
      case 'large':
        return 'bg-red-500';
      default:
        return 'bg-green-500';
    }
  });

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


  // Not performant !! change this
  get sizeConfig(){
    // console.log('test'); NOTE: check methods with a log test any time you use them in HTML
    return this.sizeMap[this.size()];
  }
}
