import { TestBed } from '@angular/core/testing';

import { CustomerDashboardserviceService } from './customer-dashboardservice.service';

describe('CustomerDashboardserviceService', () => {
  let service: CustomerDashboardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDashboardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
