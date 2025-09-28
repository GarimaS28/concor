import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeliveryComponent } from './book-delivery.component';

describe('BookDeliveryComponent', () => {
  let component: BookDeliveryComponent;
  let fixture: ComponentFixture<BookDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
