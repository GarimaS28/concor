import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStripComponent } from './user-strip.component';

describe('UserStripComponent', () => {
  let component: UserStripComponent;
  let fixture: ComponentFixture<UserStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
