import { Routes } from '@angular/router';
import { loginGuard } from './guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent, title: '3legant - Home Page'},
  {path:'shop', component: ShopComponent, title: '3legant - Shop Page'},
  {path:'product', component: ProductComponent, title: '3legant - Product Page'},
  {path:'blog', component: BlogComponent, title: '3legant - Blog Page'},
  {path:'contact', component: ContactComponent, title: '3legant - Contact Page'},
  {path:'account', component: AccountComponent, canActivate: [loginGuard], title: '3legant - Account Page'},
];
