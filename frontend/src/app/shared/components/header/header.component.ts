import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { SearchCardComponent } from '../../../features/products/components/search-card/search-card.component';
import { ProductService } from '../../../features/products/product.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    SearchCardComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);
  auth = inject(AuthService);

  searchTerm = signal('');

  onSearchInput(term: string){
    this.searchTerm.set(term);
  }

  products = signal<Product[]>([]);

  productService = inject(ProductService);
  readonly searchProductsEffect = effect(() => {
    const search = this.searchTerm().trim();

    this.productService.getAllProducts({search: search}).subscribe({
      next: (data) => {this.products.set(data.items)},
      error: (err) => {console.error('Error in search', err)}
    })
  });

  searchIsActive = signal(false);
  panelIsActive = signal(false);

  updateActivePanel(toggle: boolean){
    this.panelIsActive.set(toggle);
  }

  updateActiveSearch(toggle: boolean){
    this.searchIsActive.set(toggle);
  }
}
