import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../features/products/product.service';
import { Product } from '../../shared/models/product.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  product = signal<Product | null>(null); // cheating

  isLiked = signal(false);

  // get id from route
  route = inject(ActivatedRoute);
  private readonly id = this.route.snapshot.paramMap.get('id');

  productService = inject(ProductService);

  readonly loadProductEffect = effect(() => {
    this.productService.getProductById(this.id!).subscribe({
      next: (data) => { this.product.set(data) },
      error: (err) => {
        console.error('Error loading product', err);
        // TODO : Add ToastR
      }
    });
  });
}
