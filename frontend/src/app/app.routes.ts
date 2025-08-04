import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'shop', component: ShopComponent},
            {path: 'product/:id', component: ProductComponent}
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
