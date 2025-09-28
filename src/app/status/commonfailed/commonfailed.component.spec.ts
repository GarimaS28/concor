import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonfailedComponent } from './commonfailed.component';

describe('CommonfailedComponent', () => {
  let component: CommonfailedComponent;
  let fixture: ComponentFixture<CommonfailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonfailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonfailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
