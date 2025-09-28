import { TestBed } from '@angular/core/testing';

import { DigitaltokenserviceService } from './digitaltokenservice.service';

describe('DigitaltokenserviceService', () => {
  let service: DigitaltokenserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitaltokenserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
