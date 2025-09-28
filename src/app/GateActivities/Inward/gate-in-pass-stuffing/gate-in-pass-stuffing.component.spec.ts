import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateInPassStuffingComponent } from './gate-in-pass-stuffing.component';

describe('GateInPassStuffingComponent', () => {
  let component: GateInPassStuffingComponent;
  let fixture: ComponentFixture<GateInPassStuffingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateInPassStuffingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateInPassStuffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
