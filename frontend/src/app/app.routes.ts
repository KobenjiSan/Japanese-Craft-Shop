import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'shop', component: ShopComponent},
            // TODO : add about component
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            // TODO : add login component
            // TODO : add register component
        ]
    }
];
