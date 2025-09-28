import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPopupComponent } from './failed-popup.component';

describe('FailedPopupComponent', () => {
  let component: FailedPopupComponent;
  let fixture: ComponentFixture<FailedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
