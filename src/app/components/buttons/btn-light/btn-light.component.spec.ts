import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLightComponent } from './btn-light.component';

describe('BtnLightComponent', () => {
  let component: BtnLightComponent;
  let fixture: ComponentFixture<BtnLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnLightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
