import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../product.service';
import { LikedByListCardComponent } from '../liked-by-list-card/liked-by-list-card.component';
import { likedByUserResponse } from '../../../../shared/models/liked-by-user.model';

@Component({
  selector: 'app-liked-by-list-display',
  imports: [
    LikedByListCardComponent,
  ],
  templateUrl: './liked-by-list-display.component.html',
  styleUrl: './liked-by-list-display.component.scss'
})
export class LikedByListDisplayComponent {
  product = input<Product>();

  likedByList = signal<string[]>([]);

  productService = inject(ProductService);

  readonly getLikedByList = effect(() => {
    const product = this.product();

    this.productService.getProductLikedByList(product?.id!).subscribe({
      next: (response) => {
        this.likedByList.set(response.likedByUserIds);
      },
      error: (err) => {
        console.error('Error fetching liked by list', err);
      }
    });
  });
}
