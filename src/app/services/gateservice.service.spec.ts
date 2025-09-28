import { TestBed } from '@angular/core/testing';

import { GateserviceService } from './gateservice.service';

describe('GateserviceService', () => {
  let service: GateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
