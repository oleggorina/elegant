import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCartPaymentComponent } from './checkout-cart-payment.component';

describe('CheckoutCartPaymentComponent', () => {
  let component: CheckoutCartPaymentComponent;
  let fixture: ComponentFixture<CheckoutCartPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCartPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutCartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
