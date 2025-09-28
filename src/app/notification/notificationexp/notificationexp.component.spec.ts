import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationexpComponent } from './notificationexp.component';

describe('NotificationexpComponent', () => {
  let component: NotificationexpComponent;
  let fixture: ComponentFixture<NotificationexpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationexpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
