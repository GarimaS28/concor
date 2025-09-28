import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDeclarationComponent } from './empty-declaration.component';

describe('EmptyDeclarationComponent', () => {
  let component: EmptyDeclarationComponent;
  let fixture: ComponentFixture<EmptyDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyDeclarationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
