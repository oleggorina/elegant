import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart-coupon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-cart-coupon.component.html',
  styleUrl: './shopping-cart-coupon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartCouponComponent {
  coupon: string = '';
}
