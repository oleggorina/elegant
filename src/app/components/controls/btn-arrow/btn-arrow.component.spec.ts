import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnArrowComponent } from './btn-arrow.component';

describe('BtnArrowComponent', () => {
  let component: BtnArrowComponent;
  let fixture: ComponentFixture<BtnArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
