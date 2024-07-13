import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessageComponent } from '../../../../../../components/validation-message/validation-message.component';

@Component({
  selector: 'app-checkout-cart-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './checkout-cart-contact.component.html',
  styleUrl: './checkout-cart-contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]],
      phonenumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }
}
