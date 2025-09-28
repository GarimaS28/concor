import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutPassComponent } from './gate-out-pass.component';

describe('GateOutPassComponent', () => {
  let component: GateOutPassComponent;
  let fixture: ComponentFixture<GateOutPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateOutPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateOutPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
