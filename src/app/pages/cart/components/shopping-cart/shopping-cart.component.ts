import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductCartInterface } from '../../../../interface/interfaces';
import { CartService } from '../../../../services/cart.service';
import { ShoppingCartCouponComponent } from './components/shopping-cart-coupon/shopping-cart-coupon.component';
import { ShoppingCartProductComponent } from './components/shopping-cart-product/shopping-cart-product.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartProductComponent, ShoppingCartSummaryComponent, ShoppingCartCouponComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(CartService);
  cartItems!: ProductCartInterface[];

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems.map(cartItem => ({...cartItem}))
    })
  }

  updateProductCount(count: number, product: ProductCartInterface): void {
    product.count = count;
    this.cartService.updateCartItemCount(product.id, count);
  }
}
