import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformMessageComponent } from './inform-message.component';

describe('InformMessageComponent', () => {
  let component: InformMessageComponent;
  let fixture: ComponentFixture<InformMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
