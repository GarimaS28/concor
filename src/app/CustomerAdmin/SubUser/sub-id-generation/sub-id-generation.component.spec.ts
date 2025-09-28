import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubIdGenerationComponent } from './sub-id-generation.component';

describe('SubIdGenerationComponent', () => {
  let component: SubIdGenerationComponent;
  let fixture: ComponentFixture<SubIdGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubIdGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubIdGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
