import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartCouponComponent } from './shopping-cart-coupon.component';

describe('ShoppingCartCouponComponent', () => {
  let component: ShoppingCartCouponComponent;
  let fixture: ComponentFixture<ShoppingCartCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartCouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCartCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
