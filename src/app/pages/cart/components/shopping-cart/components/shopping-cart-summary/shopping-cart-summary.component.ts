import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BtnPrimaryComponent } from '../../../../../../components/buttons/btn-primary/btn-primary.component';
import { CartService } from '../../../../../../services/cart.service';
import { AuthService } from '../../../../../../services/auth.service';
import { ModalService } from '../../../../../../services/modal.service';

@Component({
  selector: 'app-shopping-cart-summary',
  standalone: true,
  imports: [BtnPrimaryComponent, FormsModule, CurrencyPipe, NgClass, AsyncPipe],
  templateUrl: './shopping-cart-summary.component.html',
  styleUrl: './shopping-cart-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartSummaryComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private modalService = inject(ModalService);
  cartSubtotal$!: Observable<number>;
  cartSubtotal!: number;
  selectedDeliveryOption: string = 'free';
  deliveryOptions = [
    { value: 'free', label: 'Free shipping', cost: 0 },
    { value: 'express', label: 'Express shipping', cost: 15 },
    { value: 'pickup', label: 'Pick Up', cost: 0 }
  ];

  ngOnInit(): void {
    this.cartSubtotal$ = this.cartService.subtotal$;
    this.cartService.subtotal$.subscribe(subtotal => {
      this.cartSubtotal = subtotal;
    })
  }

  calculateTotalPrice(): number {
    const selectedOption = this.deliveryOptions.find(option => option.value === this.selectedDeliveryOption);
    if (selectedOption) {
      return this.cartSubtotal + selectedOption.cost;
    } else {
      return this.cartSubtotal
    }
  }

  goToCheckoutCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.modalService.modalIsOpen.next(true);
    } else {
      const selectedOption = this.deliveryOptions.find(option => option.value === this.selectedDeliveryOption);
      if (selectedOption) {
        this.cartService.updateDeliveryCost(selectedOption.cost);
      }
      this.cartService.updateSelectedDeliveryOption(this.selectedDeliveryOption);
      this.cartService.updateTotal();
      sessionStorage.setItem('canAccessCheckout', 'true');
      this.router.navigate(['/cart/checkout-cart']);
    }
  }
}
