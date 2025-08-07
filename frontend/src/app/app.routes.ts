import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './features/authorization/login/login.component';
import { RegisterComponent } from './features/authorization/register/register.component';

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
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    }
];
