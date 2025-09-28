import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentCancellationComponent } from './indent-cancellation.component';

describe('IndentCancellationComponent', () => {
  let component: IndentCancellationComponent;
  let fixture: ComponentFixture<IndentCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentCancellationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
