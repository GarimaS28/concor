import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAllocationComponent } from './container-allocation.component';

describe('ContainerAllocationComponent', () => {
  let component: ContainerAllocationComponent;
  let fixture: ComponentFixture<ContainerAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
