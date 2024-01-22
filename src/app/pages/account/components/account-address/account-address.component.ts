import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { CardNumberDirective } from '../../../../directives/card-number.directive';
import { UserInterface } from '../../../../interface/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-address',
  standalone: true,
  imports: [ReactiveFormsModule, BtnPrimaryComponent, AsyncPipe, CardNumberDirective],
  templateUrl: './account-address.component.html',
  styleUrl: './account-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAddressComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef)
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  user$!: Observable<UserInterface | null>;
  userIdSubscription!: Subscription;
  billingForm!: FormGroup;
  shippingForm!: FormGroup;
  billingFormState: boolean = false;
  shippingFormState: boolean = false;
  
  ngOnInit(): void {
    this.billingForm = this.formBuilder.group({
      card: [null, [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.shippingForm = this.formBuilder.group({
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.userIdSubscription = this.authService.userId$.subscribe((id) => {
      if (id) {
        this.user$ = this.userService.getUser(id);
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }

  addBillingAddress() {
    if (this.billingForm.valid) {
      const {card, month, year} = this.billingForm.value;
      this.user$.subscribe((user) => {
        if (user) {
          this.userService.addBillingAddress(user.id, card, month, year);
          this.user$=this.userService.getUser(user.id);
          this.billingForm.reset();
        }
      })
    }
  }

  addShippingAddress() {
    if (this.shippingForm.valid) {
      const {telephone, address} = this.shippingForm.value;
      this.user$.subscribe((user) => {
        if (user) {
          this.userService.addShippingAddress(user.id, telephone, address);
          this.user$=this.userService.getUser(user.id);
          this.shippingForm.reset();
        }
      })
    }
  }

  toggleBillingForm(): void {
    this.billingFormState = true;
    this.shippingFormState = false;
  }

  toggleShippingForm(): void {
    this.billingFormState = false;
    this.shippingFormState = true;
  }
}
