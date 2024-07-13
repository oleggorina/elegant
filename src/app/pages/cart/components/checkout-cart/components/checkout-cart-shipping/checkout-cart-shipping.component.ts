import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessageComponent } from '../../../../../../components/validation-message/validation-message.component';

@Component({
  selector: 'app-checkout-cart-shipping',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './checkout-cart-shipping.component.html',
  styleUrl: './checkout-cart-shipping.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartShippingComponent implements OnInit {
  private fb = inject(FormBuilder);
  deliveryForm!: FormGroup;
  
  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    })
  }
}
