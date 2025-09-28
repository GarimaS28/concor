import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardingNoteComponent } from './forwarding-note.component';

describe('ForwardingNoteComponent', () => {
  let component: ForwardingNoteComponent;
  let fixture: ComponentFixture<ForwardingNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardingNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
