import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveIndentComponent } from './retrieve-indent.component';

describe('RetrieveIndentComponent', () => {
  let component: RetrieveIndentComponent;
  let fixture: ComponentFixture<RetrieveIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrieveIndentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrieveIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
