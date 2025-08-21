import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { ProductFavoriteListDisplayComponent } from '../components/product-favorite-list-display/product-favorite-list-display.component';

@Component({
  selector: 'app-favorites-page',
  imports: [
    RouterLink,
    ProductFavoriteListDisplayComponent,
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent {
  auth = inject(AuthService);
}
