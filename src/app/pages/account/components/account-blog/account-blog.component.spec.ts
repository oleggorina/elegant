import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBlogComponent } from './account-blog.component';

describe('AccountBlogComponent', () => {
  let component: AccountBlogComponent;
  let fixture: ComponentFixture<AccountBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
