import {Routes} from '@angular/router';
import {authGuard} from './guards/authGuard';
import {LoginComponent} from './components/login/login.component';
import {ProductComponent} from './components/product/product.component';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {roleGuard} from './guards/roleGuard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [authGuard], title: 'Home'
  },
  {
    path: 'users', component: UserComponent, canActivate: [roleGuard(['ADMIN'])], title: 'Users'
  },
  {
    path: 'products', component: ProductComponent, canActivate: [roleGuard(['ADMIN'])], title: 'Products'
  },
  {
    path: 'login', component: LoginComponent, title: 'Login'
  },
  {
    path: '**', redirectTo: ''
  }
];
