import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCartContactComponent } from './checkout-cart-contact.component';

describe('CheckoutCartContactComponent', () => {
  let component: CheckoutCartContactComponent;
  let fixture: ComponentFixture<CheckoutCartContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCartContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutCartContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
