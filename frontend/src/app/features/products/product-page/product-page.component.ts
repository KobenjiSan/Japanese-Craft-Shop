import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { Product } from '../../../shared/models/product.model';
import { AuthService } from '../../../shared/services/auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  product = signal<Product | null>(null); // cheating
  currentImage = signal<string>('');

  auth = inject(AuthService);
  router = inject(Router);

  // get id from route
  route = inject(ActivatedRoute);
  private readonly id = this.route.snapshot.paramMap.get('id');

  productService = inject(ProductService);

  readonly loadProductEffect = effect(() => {
    this.productService.getProductById(this.id!).subscribe({
      next: (data) => { 
        this.product.set(data);
        this.currentImage.set(this.product()?.imageUrls?.at(0)!);
      },
      error: (err) => {
        console.error('Error loading product', err);
        // TODO : Add ToastR
      }
    });
  });

  setImage(image: string){
    this.currentImage.set(image);
  }

  isLiked = signal<boolean>(false);
  likedProducts = signal<string[]>([])

  setLikedProducts = effect(() => {
    if(!this.auth.isLoggedIn()){
      return;
    }
    
    this.auth.getLikedProducts().subscribe({
      next: (res) => {
        this.likedProducts.set(res.likedProducts ?? []);
        const liked = !!this.id && this.likedProducts().includes(this.id);
        this.isLiked.set(liked);
      },
      error: (err) => {
        console.error(err);
      }
    });
  });

  toggleLiked(event: MouseEvent){
    event.stopPropagation();

    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login']);;
      return;
    }

    this.auth.likeProduct(this.product()?.id!).subscribe({
      next: (res) => {
        this.isLiked.set(res.isLiked);
      },
      error: (err) => {
        console.error(`failed to like product ${this.product()?.title}`, err)
      }
    });
  }
}
