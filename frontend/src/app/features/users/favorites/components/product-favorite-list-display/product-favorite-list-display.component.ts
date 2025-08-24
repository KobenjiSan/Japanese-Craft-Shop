import { Component, effect, inject, signal } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';
import { ProductService } from '../../../../products/product.service';
import { ProductFavoriteListCardComponent } from '../product-favorite-list-card/product-favorite-list-card.component';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-product-favorite-list-display',
  imports: [ProductFavoriteListCardComponent],
  templateUrl: './product-favorite-list-display.component.html',
  styleUrl: './product-favorite-list-display.component.scss'
})
export class ProductFavoriteListDisplayComponent {
  products = signal<Product[]>([]);
  auth = inject(AuthService);

  readonly loadProductsEffect = effect(() => {
    this.refreshTick();
    this.auth.getLikedProductsObjs().subscribe({
      next: (data) => {
        this.products.set(data.likedProductObjs);
      },
      error: (err) => {
        console.error("Error fetching chapters", err);
      }
    });
  });

  refreshTick = signal(0);

  onRefresh(){
    this.refreshTick.update(v => v + 1);
  }
  
}
