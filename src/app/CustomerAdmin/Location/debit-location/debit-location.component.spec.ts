import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitLocationComponent } from './debit-location.component';

describe('DebitLocationComponent', () => {
  let component: DebitLocationComponent;
  let fixture: ComponentFixture<DebitLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
