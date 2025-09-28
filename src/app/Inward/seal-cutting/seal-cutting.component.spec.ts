import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealCuttingComponent } from './seal-cutting.component';

describe('SealCuttingComponent', () => {
  let component: SealCuttingComponent;
  let fixture: ComponentFixture<SealCuttingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SealCuttingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SealCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
