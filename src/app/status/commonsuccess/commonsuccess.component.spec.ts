import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsuccessComponent } from './commonsuccess.component';

describe('CommonsuccessComponent', () => {
  let component: CommonsuccessComponent;
  let fixture: ComponentFixture<CommonsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonsuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
