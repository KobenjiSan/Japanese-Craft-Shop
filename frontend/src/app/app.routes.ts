import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { HomeComponent } from './features/home/home/home.component';
import { ShopComponent } from './features/shop/shop/shop.component';
import { AboutComponent } from './features/about/about/about.component';
import { UserProfileComponent } from './features/users/user-profile/user-profile.component';
import { FavoritesPageComponent } from './features/users/favorites/favorites-page/favorites-page.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { ProductPageComponent } from './features/products/product-page/product-page.component';


// NOTE: this is eagerly loaded ---- Break into lazy loading
export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'shop', component: ShopComponent},
            {path: 'product/:id', component: ProductPageComponent},
            {path: 'about', component: AboutComponent}
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path: 'login', component: LoginComponent, canActivate: [guestGuard]},
            {path: 'register', component: RegisterComponent, canActivate: [guestGuard]},
            {path: 'profile', component: UserProfileComponent, canActivate: [authGuard]},
            {path: 'favorites', component: FavoritesPageComponent, canActivate: [authGuard]},
            {path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard]}
        ]
    }
];

