import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOUTCargoComponent } from './gate-outcargo.component';

describe('GateOUTCargoComponent', () => {
  let component: GateOUTCargoComponent;
  let fixture: ComponentFixture<GateOUTCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateOUTCargoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateOUTCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
