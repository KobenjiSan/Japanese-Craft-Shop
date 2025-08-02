import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home.component').then(
                (m) => m.HomeComponent
            )
    },
    {
        path: 'shop',
        loadComponent: () => 
            import('./pages/shop/shop.component').then(
                (m) => m.ShopComponent
            )
    }
];
