import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotedContainerCancellationComponent } from './alloted-container-cancellation.component';

describe('AllotedContainerCancellationComponent', () => {
  let component: AllotedContainerCancellationComponent;
  let fixture: ComponentFixture<AllotedContainerCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllotedContainerCancellationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllotedContainerCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
