import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserHeaderComponent } from '../components/user-header/user-header.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { RecentSavesComponent } from '../components/recent-saves/recent-saves.component';
import { Product } from '../../../../shared/models/product.model';
import { FavoritesChartComponent } from '../components/favorites-chart/favorites-chart.component';

@Component({
  selector: 'app-user-profile-display',
  imports: [
    UserHeaderComponent,
    AccountSettingsComponent,
    RecentSavesComponent,
    FavoritesChartComponent,
  ],
  templateUrl: './user-profile-display.component.html',
  styleUrl: './user-profile-display.component.scss'
})
export class UserProfileDisplayComponent {
  auth = inject(AuthService);

  username = this.auth.getUsername();
  email = this.auth.getUserEmail();

  likedProducts = signal<Product[]>([]);

  readonly loadProductsEffect = effect(() => {
    // this.refreshTick();
    this.auth.getLikedProductsObjs().subscribe({
      next: (data) => {
        this.likedProducts.set(data.likedProductObjs);
      },
      error: (err) => {
        console.error("Error fetching chapters", err);
      }
    });
  });

}
