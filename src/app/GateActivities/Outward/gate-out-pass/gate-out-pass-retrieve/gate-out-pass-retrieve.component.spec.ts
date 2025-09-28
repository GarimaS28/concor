import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutPassRetrieveComponent } from './gate-out-pass-retrieve.component';

describe('GateOutPassRetrieveComponent', () => {
  let component: GateOutPassRetrieveComponent;
  let fixture: ComponentFixture<GateOutPassRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateOutPassRetrieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateOutPassRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
