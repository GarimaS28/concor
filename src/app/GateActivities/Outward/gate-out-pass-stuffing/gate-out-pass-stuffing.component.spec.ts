import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutPassStuffingComponent } from './gate-out-pass-stuffing.component';

describe('GateOutPassStuffingComponent', () => {
  let component: GateOutPassStuffingComponent;
  let fixture: ComponentFixture<GateOutPassStuffingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateOutPassStuffingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateOutPassStuffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
