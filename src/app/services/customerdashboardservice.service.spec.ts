import { TestBed } from '@angular/core/testing';

import { CustomerdashboardserviceService } from './customerdashboardservice.service';

describe('CustomerdashboardserviceService', () => {
  let service: CustomerdashboardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerdashboardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
