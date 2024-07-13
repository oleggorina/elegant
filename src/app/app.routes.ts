import { Routes } from '@angular/router';
import { loginGuard } from './guards/auth.guard';
import { authResolver } from './resolvers/auth.resolver';
import { blogResolver } from './resolvers/blog.resolver';
import { productResolver } from './resolvers/product.resolver';
import { checkoutAuthGuard } from './guards/checkout-auth.guard';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', loadComponent: () =>
    import('./pages/home/home.component').then((c) => c.HomeComponent), title: '3legant - Home Page'},
  {path:'shop', loadComponent: () => 
    import('./pages/shop/shop.component').then((c) => c.ShopComponent), title: '3legant - Shop Page'},
  {path:'product-details/:id', loadComponent: () => import('./pages/shop/components/product-details/product-details.component').then((c) => c.ProductDetailsComponent), resolve: {data: productResolver}, title: '3legant - Product Details Page'},
  {path:'blog', loadComponent: () =>
    import('./pages/blog/blog.component').then((c) => c.BlogComponent), title: '3legant - Blog Page'},
  {path:'article-details/:id', loadComponent: () => import('./pages/blog/components/article-details/article-details.component').then((c) => c.ArticleDetailsComponent), resolve: {data: blogResolver}},
  {path:'contact', loadComponent: () =>
    import('./pages/contact/contact.component').then((c) => c.ContactComponent), title: '3legant - Contact Page'},
  {path: 'cart', loadComponent: () => 
    import('./pages/cart/cart.component').then((c) => c.CartComponent), title: '3legant - Shopping Cart', children: [
    {path: '', redirectTo: 'shopping-cart', pathMatch: 'full'},
    {path: 'shopping-cart', loadComponent: () => import('./pages/cart/components/shopping-cart/shopping-cart.component').then((c) => c.ShoppingCartComponent)},
    {path: 'checkout-cart', loadComponent: () => import('./pages/cart/components/checkout-cart/checkout-cart.component').then((c) => c.CheckoutCartComponent), title: '3legant - Checkout Details', canActivate: [checkoutAuthGuard]},
    {path: 'order-complete', loadComponent: () => import('./pages/cart/components/order-complete/order-complete.component').then((c) => c.OrderCompleteComponent), title: '3legant - Order Complete'}
  ]},
  {path:'account', loadComponent: () =>
    import('./pages/account/account.component').then((c) => c.AccountComponent), resolve: {data: authResolver}, canActivate: [loginGuard], title: '3legant - Account Page', children: [
    {path: '', redirectTo: 'details', pathMatch: 'full'},
    {path: 'details', loadComponent: () => import('./pages/account/components/account-details/account-details.component').then((c) => c.AccountDetailsComponent)},
    {path: 'address', loadComponent: () => import('./pages/account/components/account-address/account-address.component').then((c) => c.AccountAddressComponent)},
    {path: 'orders', loadComponent: () => import('./pages/account/components/account-orders/account-orders.component').then((c) => c.AccountOrdersComponent)},
    {path: 'wishlist', loadComponent: () => import('./pages/account/components/account-wishlist/account-wishlist.component').then((c) => c.AccountWishlistComponent)},
    {path: 'product', loadComponent: () => import('./pages/account/components/account-product/account-product.component').then((c) => c.AccountProductComponent)},
    {path: 'blog', loadComponent: () => import('./pages/account/components/account-blog/account-blog.component').then((c) => c.AccountBlogComponent)},
  ]},
];
