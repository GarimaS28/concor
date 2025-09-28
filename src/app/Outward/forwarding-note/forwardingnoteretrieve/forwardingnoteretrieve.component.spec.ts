import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardingnoteretrieveComponent } from './forwardingnoteretrieve.component';

describe('ForwardingnoteretrieveComponent', () => {
  let component: ForwardingnoteretrieveComponent;
  let fixture: ComponentFixture<ForwardingnoteretrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardingnoteretrieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardingnoteretrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
