import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  auth = inject(AuthService);
  router = inject(Router);

  likedProducts = signal<string[]>([])
  isLiked = signal<boolean>(false);

  load(productId: string) {
    effect(() => {
      this.auth.getLikedProducts().subscribe({
        next: (res) => {
          this.likedProducts.set(res.likedProducts ?? []);
          const liked = !!productId && this.likedProducts().includes(productId);
          this.isLiked.set(liked);
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }

  toggle(productId: string) {

    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);;
      return;
    }

    this.auth.likeProduct(productId).subscribe({
      next: (res) => {
        this.isLiked.set(res.isLiked);
      },
      error: (err) => {
        console.error(`failed to like product ${productId}`, err)
      }
    });
  };
}
