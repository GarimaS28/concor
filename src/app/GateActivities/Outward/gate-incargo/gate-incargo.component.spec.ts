import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateINCargoComponent } from './gate-incargo.component';

describe('GateINCargoComponent', () => {
  let component: GateINCargoComponent;
  let fixture: ComponentFixture<GateINCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateINCargoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateINCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
