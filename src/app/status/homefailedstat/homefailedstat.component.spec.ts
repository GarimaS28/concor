import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomefailedstatComponent } from './homefailedstat.component';

describe('HomefailedstatComponent', () => {
  let component: HomefailedstatComponent;
  let fixture: ComponentFixture<HomefailedstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomefailedstatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomefailedstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
