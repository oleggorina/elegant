import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, Subscription, switchMap, mergeMap, of } from 'rxjs';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { UserInterface } from '../../../../interface/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-address',
  standalone: true,
  imports: [ReactiveFormsModule, BtnPrimaryComponent, AsyncPipe],
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
  
  ngOnInit(): void {
    this.billingForm = this.formBuilder.group({
      card: ['', [Validators.required]],
      expDate: ['', [Validators.required]],
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

  addBillingAddress() {
    const {card, expDate} = this.billingForm.value;
    this.user$.subscribe((user) => {
      if (user) {
        this.userService.addBillingAddress(user.id, card, expDate);
        this.user$=this.userService.getUser(user.id);
      }
    })
  }

  addShippingAddress() {
    const {telephone, address} = this.shippingForm.value;
    this.user$.subscribe((user) => {
      if (user) {
        this.userService.addShippingAddress(user.id, telephone, address);
        this.user$=this.userService.getUser(user.id);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }
}
