import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NumberBadgeComponent } from '../../components/badges/number-badge/number-badge.component';
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NumberBadgeComponent, RouterLink, RouterLinkActive, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  private router = inject(Router);
  @ViewChild(ShoppingCartComponent) shoppingCartComponent!: RouterLinkActive;
  @ViewChild(CheckoutCartComponent) checkoutCartComponent!: RouterLinkActive;
  @ViewChild(OrderCompleteComponent) orderCompleteComponent!: RouterLinkActive;

  isLinkActive(route: string): boolean {
    return this.router.url.includes(route)
  }

}
