import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberBadgeComponent } from './number-badge.component';

describe('NumberBadgeComponent', () => {
  let component: NumberBadgeComponent;
  let fixture: ComponentFixture<NumberBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
