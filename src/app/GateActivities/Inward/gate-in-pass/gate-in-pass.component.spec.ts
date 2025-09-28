import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateInPassComponent } from './gate-in-pass.component';

describe('GateInPassComponent', () => {
  let component: GateInPassComponent;
  let fixture: ComponentFixture<GateInPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateInPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateInPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
