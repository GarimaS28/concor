import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealAllocationComponent } from './seal-allocation.component';

describe('SealAllocationComponent', () => {
  let component: SealAllocationComponent;
  let fixture: ComponentFixture<SealAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SealAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SealAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
