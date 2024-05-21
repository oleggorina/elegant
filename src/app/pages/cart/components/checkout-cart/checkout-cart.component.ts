import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { OrderInfo, ProductCartInterface } from '../../../../interface/interfaces';
import { CheckoutCartContactComponent } from './components/checkout-cart-contact/checkout-cart-contact.component';
import { CheckoutCartPaymentComponent } from './components/checkout-cart-payment/checkout-cart-payment.component';
import { CheckoutCartShippingComponent } from './components/checkout-cart-shipping/checkout-cart-shipping.component';
import { CheckoutCartSummaryComponent } from './components/checkout-cart-summary/checkout-cart-summary.component';

@Component({
  selector: 'app-checkout-cart',
  standalone: true,
  imports: [CheckoutCartContactComponent, CheckoutCartShippingComponent, CheckoutCartPaymentComponent, BtnPrimaryComponent, CheckoutCartSummaryComponent],
  templateUrl: './checkout-cart.component.html',
  styleUrl: './checkout-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartComponent {
  @ViewChild(CheckoutCartContactComponent) contactFormComponent!: CheckoutCartContactComponent;
  @ViewChild(CheckoutCartShippingComponent) shippingFormComponent!: CheckoutCartShippingComponent;
  @ViewChild(CheckoutCartPaymentComponent) paymentFormComponent!: CheckoutCartPaymentComponent;

  orderInfo: OrderInfo = {
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

  submitOrder(): void {
    this.orderInfo.contact = this.contactFormComponent.contactForm.value;
    this.orderInfo.delivery = this.shippingFormComponent.deliveryForm.value;
    this.orderInfo.payment = this.paymentFormComponent.paymentForm.value;
    console.log(this.orderInfo);
  }
}
