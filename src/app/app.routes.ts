import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { adminGuard, authGuard } from './shared/guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'catalogue',
    component: ProductsComponent,
    title: 'Catalogue',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Your Cart',
    canActivate: [authGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    title: 'Orders',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
