import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateInPassRetrieveComponent } from './gate-in-pass-retrieve.component';

describe('GateInPassRetrieveComponent', () => {
  let component: GateInPassRetrieveComponent;
  let fixture: ComponentFixture<GateInPassRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateInPassRetrieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateInPassRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
