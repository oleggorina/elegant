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
import { ArticleDetailsComponent } from './pages/blog/components/article-details/article-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutCartComponent } from './pages/cart/components/checkout-cart/checkout-cart.component';
import { OrderCompleteComponent } from './pages/cart/components/order-complete/order-complete.component';
import { ShoppingCartComponent } from './pages/cart/components/shopping-cart/shopping-cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/shop/components/product-details/product-details.component';
import { ShopComponent } from './pages/shop/shop.component';
import { authResolver } from './resolvers/auth.resolver';
import { blogResolver } from './resolvers/blog.resolver';
import { productResolver } from './resolvers/product.resolver';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent, title: '3legant - Home Page'},
  {path:'shop', component: ShopComponent, title: '3legant - Shop Page'},
  {path:'product-details/:id', component: ProductDetailsComponent, resolve: {data: productResolver}, title: '3legant - Product Details Page'},
  {path:'blog', component: BlogComponent, title: '3legant - Blog Page'},
  {path:'article-details/:id', component: ArticleDetailsComponent, resolve: {data: blogResolver}},
  {path:'contact', component: ContactComponent, title: '3legant - Contact Page'},
  {path: 'cart', component: CartComponent, title: '3legant - Shopping Cart', children: [
    {path: '', redirectTo: 'shopping-cart', pathMatch: 'full'},
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'checkout-cart', component: CheckoutCartComponent, title: '3legant - Checkout Details'},
    {path: 'order-complete', component: OrderCompleteComponent, title: '3legant - Order Complete'}
  ]},
  {path:'account/:id', component: AccountComponent, resolve: {data: authResolver}, canActivate: [loginGuard], title: '3legant - Account Page', children: [
    {path: '', redirectTo: 'details', pathMatch: 'full'},
    {path: 'details', component: AccountDetailsComponent},
    {path: 'address', component: AccountAddressComponent},
    {path: 'orders', component: AccountOrdersComponent},
    {path: 'wishlist', component: AccountWishlistComponent},
    {path: 'product', component: AccountProductComponent, canActivate: [adminGuard]},
    {path: 'blog', component: AccountBlogComponent, canActivate: [adminGuard]},
  ]},
];
