import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './features/authorization/login/login.component';
import { RegisterComponent } from './features/authorization/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { UserProfileComponent } from './features/users/user-profile/user-profile.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { FavoritesPageComponent } from './features/users/favorites-page/favorites-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'shop', component: ShopComponent},
            {path: 'product/:id', component: ProductComponent},
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
