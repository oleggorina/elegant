import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { InformMessageComponent } from '../../../../components/inform-message/inform-message.component';
import { CardNumberDirective } from '../../../../directives/card-number.directive';
import { UserInterface } from '../../../../interface/interfaces';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-address',
  standalone: true,
  imports: [ReactiveFormsModule, BtnPrimaryComponent, AsyncPipe, CardNumberDirective, InformMessageComponent, MatProgressSpinnerModule],
  templateUrl: './account-address.component.html',
  styleUrl: './account-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAddressComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef)
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  user$!: Observable<UserInterface | null>;
  billingForm!: FormGroup;
  shippingForm!: FormGroup;
  billingFormState: boolean = false;
  shippingFormState: boolean = false;
  message!: string;
  
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
    this.user$ = this.userService.user$;
    this.user$.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    })
  }

  addBillingAddress() {
    if (this.billingForm.valid) {
      const {card, month, year} = this.billingForm.value;
      this.userService.getUserId().subscribe({
        next: (userId) => {
          this.userService.addBillingAddress((userId as string), card, month, year).subscribe({
            next: () => {
              this.billingForm.reset();
              this.message = 'Billing address updated successfully';
              this.changeDetectorRef.detectChanges();
            }
          })
      }
      })
    }
  }

  addShippingAddress() {
    if (this.shippingForm.valid) {
      const {telephone, address} = this.shippingForm.value;
      this.userService.getUserId().subscribe({
        next: (userId) => {
          this.userService.addShipingAddress((userId as string), telephone, address).subscribe({
            next: () => {
              this.shippingForm.reset();
              this.message = 'Shipping address updated successfully';
              this.changeDetectorRef.detectChanges();
            },
            error: (error) => console.log(error)            
          })
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
