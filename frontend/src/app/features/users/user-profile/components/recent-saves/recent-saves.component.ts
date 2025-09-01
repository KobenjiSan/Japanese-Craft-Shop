import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';
import { ProductCardComponent } from '../../../../products/components/product-card/product-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recent-saves',
  imports: [
    ProductCardComponent,
    RouterLink,
],
  templateUrl: './recent-saves.component.html',
  styleUrl: './recent-saves.component.scss'
})
export class RecentSavesComponent {
  products = input<Product[]>();

  router = inject(Router);

}
