import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactValuesComponent } from './contact-values.component';

describe('ContactValuesComponent', () => {
  let component: ContactValuesComponent;
  let fixture: ComponentFixture<ContactValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
