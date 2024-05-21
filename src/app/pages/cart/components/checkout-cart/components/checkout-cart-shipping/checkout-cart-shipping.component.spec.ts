import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCartShippingComponent } from './checkout-cart-shipping.component';

describe('CheckoutCartShippingComponent', () => {
  let component: CheckoutCartShippingComponent;
  let fixture: ComponentFixture<CheckoutCartShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCartShippingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutCartShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
