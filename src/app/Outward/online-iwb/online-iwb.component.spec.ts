import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineIWBComponent } from './online-iwb.component';

describe('OnlineIWBComponent', () => {
  let component: OnlineIWBComponent;
  let fixture: ComponentFixture<OnlineIWBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineIWBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineIWBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
