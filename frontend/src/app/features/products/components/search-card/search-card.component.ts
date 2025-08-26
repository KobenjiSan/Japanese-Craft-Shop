import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-card',
  imports: [],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.scss'
})
export class SearchCardComponent {
  product = input<Product>();
  router = inject(Router);
  closeSearchReq = output();

  onSelect(){
    this.router.navigate(['/product', this.product()?.id]);
    this.closeSearchReq.emit();
  }
}
