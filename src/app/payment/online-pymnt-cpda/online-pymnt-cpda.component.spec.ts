import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePymntCPDAComponent } from './online-pymnt-cpda.component';

describe('OnlinePymntCPDAComponent', () => {
  let component: OnlinePymntCPDAComponent;
  let fixture: ComponentFixture<OnlinePymntCPDAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlinePymntCPDAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlinePymntCPDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
