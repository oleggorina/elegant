import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BtnPrimaryComponent } from '../../../../../../components/buttons/btn-primary/btn-primary.component';
import { CounterComponent } from '../../../../../../components/buttons/counter/counter.component';
import { ProductCartInterface } from '../../../../../../interface/interfaces';
import { CartService } from '../../../../../../services/cart.service';

@Component({
  selector: 'app-checkout-cart-summary',
  standalone: true,
  imports: [CounterComponent, CurrencyPipe, AsyncPipe, BtnPrimaryComponent],
  templateUrl: './checkout-cart-summary.component.html',
  styleUrl: './checkout-cart-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartSummaryComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private cartService = inject(CartService);
  cartItems!: ProductCartInterface[];
  cartSubtotal$!: Observable<number>;
  cartTotal$!: Observable<number>;
  cartShipping$!: Observable<string>;
  cartTotal!: number;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems.map(cartItem => ({...cartItem}));
    })
    this.cartSubtotal$ = this.cartService.subtotal$;
    this.cartTotal$ = this.cartService.total$;
    this.cartShipping$ = this.cartService.selectedDeliveryOption$;
    this.changeDetectorRef.detectChanges();
  }

  updateProductCount(count: number, product: ProductCartInterface): void {
    product.count = count;
    this.cartService.updateCartItemCount(product.id, count);
  }

  getPriceWithDiscount(product: ProductCartInterface): number {
    return this.cartService.getPriceWithDiscount(product);
  }
}
