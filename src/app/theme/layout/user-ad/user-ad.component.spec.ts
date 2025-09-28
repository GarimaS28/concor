import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdComponent } from './user-ad.component';

describe('UserAdComponent', () => {
  let component: UserAdComponent;
  let fixture: ComponentFixture<UserAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
