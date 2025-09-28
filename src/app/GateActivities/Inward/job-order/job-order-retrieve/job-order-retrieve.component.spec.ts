import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderRetrieveComponent } from './job-order-retrieve.component';

describe('JobOrderRetrieveComponent', () => {
  let component: JobOrderRetrieveComponent;
  let fixture: ComponentFixture<JobOrderRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOrderRetrieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOrderRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
