import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CounterComponent } from '../../../../../../components/buttons/counter/counter.component';
import { ProductCartInterface } from '../../../../../../interface/interfaces';
import { CartService } from '../../../../../../services/cart.service';

@Component({
  selector: 'app-shopping-cart-product',
  standalone: true,
  imports: [CounterComponent, CurrencyPipe],
  templateUrl: './shopping-cart-product.component.html',
  styleUrl: './shopping-cart-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartProductComponent {
  private cartService = inject(CartService);
  @Input() product!: ProductCartInterface;
  @Output() countChange = new EventEmitter<number>();
  
  onCountChange(count: number): void {
    this.countChange.emit(count);
  }

  removeFromCart(productId: string, color: string) {
    this.cartService.removeFromCart(productId, color);
  }

  getSubtotalPrice(product: ProductCartInterface): number {
    return this.cartService.getSubtotalPrice(product);
  }

  getPriceWithDiscount(product: ProductCartInterface): number {
    return this.cartService.getPriceWithDiscount(product);
  }
}
