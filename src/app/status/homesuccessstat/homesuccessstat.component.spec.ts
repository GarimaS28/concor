import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesuccessstatComponent } from './homesuccessstat.component';

describe('HomesuccessstatComponent', () => {
  let component: HomesuccessstatComponent;
  let fixture: ComponentFixture<HomesuccessstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomesuccessstatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesuccessstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
