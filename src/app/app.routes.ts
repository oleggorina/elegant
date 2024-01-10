import { Routes } from '@angular/router';
import { adminGuard, loginGuard } from './guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { AccountAddressComponent } from './pages/account/components/account-address/account-address.component';
import { AccountBlogComponent } from './pages/account/components/account-blog/account-blog.component';
import { AccountDetailsComponent } from './pages/account/components/account-details/account-details.component';
import { AccountOrdersComponent } from './pages/account/components/account-orders/account-orders.component';
import { AccountProductComponent } from './pages/account/components/account-product/account-product.component';
import { AccountWishlistComponent } from './pages/account/components/account-wishlist/account-wishlist.component';
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
  {path:'account', component: AccountComponent, canActivate: [loginGuard], title: '3legant - Account Page', children: [
    {path: '', redirectTo: 'details', pathMatch: 'full'},
    {path: 'details', component: AccountDetailsComponent},
    {path: 'address', component: AccountAddressComponent},
    {path: 'orders', component: AccountOrdersComponent},
    {path: 'wishlist', component: AccountWishlistComponent},
    {path: 'product', component: AccountProductComponent, canActivate: [adminGuard]},
    {path: 'blog', component: AccountBlogComponent, canActivate: [adminGuard]},
  ]},
];
