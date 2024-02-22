import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLoadComponent } from './btn-load.component';

describe('BtnLoadComponent', () => {
  let component: BtnLoadComponent;
  let fixture: ComponentFixture<BtnLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLoadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
