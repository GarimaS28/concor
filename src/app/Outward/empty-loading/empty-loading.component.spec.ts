import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLoadingComponent } from './empty-loading.component';

describe('EmptyLoadingComponent', () => {
  let component: EmptyLoadingComponent;
  let fixture: ComponentFixture<EmptyLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
