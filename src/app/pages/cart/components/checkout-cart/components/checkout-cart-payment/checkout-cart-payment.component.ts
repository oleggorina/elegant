import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardNumberDirective } from '../../../../../../directives/card-number.directive';

@Component({
  selector: 'app-checkout-cart-payment',
  standalone: true,
  imports: [CardNumberDirective, ReactiveFormsModule],
  templateUrl: './checkout-cart-payment.component.html',
  styleUrl: './checkout-cart-payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartPaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  paymentForm!: FormGroup;

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      card: ['', [Validators.required]],
      expiration: ['', [Validators.required]],
      cvc: ['', [Validators.required]]
    })
  }
}
