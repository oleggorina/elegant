import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArrivalsComponent } from './home-arrivals.component';

describe('HomeArrivalsComponent', () => {
  let component: HomeArrivalsComponent;
  let fixture: ComponentFixture<HomeArrivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArrivalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
