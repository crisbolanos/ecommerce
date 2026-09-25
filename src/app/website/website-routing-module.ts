import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { MyCart } from './pages/my-cart/my-cart';
import { Profile } from './pages/profile/profile';
import { Recovery } from './pages/recovery/recovery';
import { Register } from './pages/register/register';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Layout } from './components/layout/layout';
import { authGuard } from '../guards/auth-guard';
import { exitGuard } from '../guards/exit-guard';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category-routing-module').then(m => m.CategoryRoutingModule),
        data: {
          preload: true,
        }
      },
      {
        path: 'product/:id',
        component: ProductDetail
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'mycart',
        component: MyCart
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        component: Profile
      },
      {
        path: 'recovery',
        component: Recovery
      },
      {
        path: 'register',
        canDeactivate: [exitGuard],
        component: Register
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
