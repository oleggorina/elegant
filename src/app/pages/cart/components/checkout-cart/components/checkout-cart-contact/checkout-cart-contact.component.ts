import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-cart-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-cart-contact.component.html',
  styleUrl: './checkout-cart-contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutCartContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      phonenumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }
}
