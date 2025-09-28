import { TestBed } from '@angular/core/testing';

import { GatepassstoreserviceService } from './gatepassstoreservice.service';

describe('GatepassstoreserviceService', () => {
  let service: GatepassstoreserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatepassstoreserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
