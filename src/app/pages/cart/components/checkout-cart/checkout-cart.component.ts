import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CheckoutCartContactComponent } from './components/checkout-cart-contact/checkout-cart-contact.component';
import { CheckoutCartPaymentComponent } from './components/checkout-cart-payment/checkout-cart-payment.component';
import { CheckoutCartShippingComponent } from './components/checkout-cart-shipping/checkout-cart-shipping.component';
import { CheckoutCartSummaryComponent } from './components/checkout-cart-summary/checkout-cart-summary.component';
import { ValidationMessageComponent } from '../../../../components/validation-message/validation-message.component';
import { UserService } from '../../../../services/user.service';
import { switchMap } from 'rxjs';
import { CartService } from '../../../../services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { OrderInfoInterface, ProductCartInterface } from '../../../../interface/interfaces';

@Component({
  selector: 'app-checkout-cart',
  standalone: true,
  imports: [CheckoutCartContactComponent, CheckoutCartShippingComponent, CheckoutCartPaymentComponent, BtnPrimaryComponent, CheckoutCartSummaryComponent, ValidationMessageComponent],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutCartComponent implements OnInit {
  private userService = inject(UserService);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild(CheckoutCartContactComponent) contactFormComponent!: CheckoutCartContactComponent;
  @ViewChild(CheckoutCartShippingComponent) shippingFormComponent!: CheckoutCartShippingComponent;
  @ViewChild(CheckoutCartPaymentComponent) paymentFormComponent!: CheckoutCartPaymentComponent;

  orderInfo: OrderInfoInterface = {
    contact: {
      name: '',
      surname: '',
      phonenumber: '',
      email: ''
    },
    delivery: {
      address: '',
      city: '',
      country: '',
      state: '',
      zip: ''
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvc: ''
    }
  }
  products!: ProductCartInterface[];
  delivery!: string;
  cost!: number;
  errorMessage!: string;

  ngOnInit(): void {
    sessionStorage.removeItem('canAccessCheckout');
    this.cartService.selectedDeliveryOption$.subscribe(delivery => {
      this.delivery = delivery;
    });
    this.products = this.cartService.getCartItems();
    this.cartService.total$.subscribe(cost => {
      this.cost = cost
    })
    this.changeDetectorRef.detectChanges();
  }

  submitOrder(): void {
    if (this.contactFormComponent.contactForm.valid && this.shippingFormComponent.deliveryForm.valid && this.paymentFormComponent.paymentForm.valid) {
      const contact = this.contactFormComponent.contactForm.value;
      const delivery = this.shippingFormComponent.deliveryForm.value;
      const payment = this.paymentFormComponent.paymentForm.value;

      this.userService.getUserId().pipe(
        switchMap(userId => {
          if (userId) {
            return this.userService.addOrder(userId, { contact, delivery, payment }, this.products, this.cost, this.delivery);
          } else {
            throw new Error('User not logged in');
          }
        })
      ).subscribe({
        next: (order) => {
          this.orderService.setOrderId(order.id);
          this.cartService.clearCart();
          this.router.navigate(['/cart/order-complete']);
          console.log('Order placed');
        },
        error: (error) => console.log(error)
      })

    } else {
      this.errorMessage = 'Invalid form';
    }
  }
}
