import { TestBed } from '@angular/core/testing';

import { UserApprovalServiceService } from './user-approval-service.service';

describe('UserApprovalServiceService', () => {
  let service: UserApprovalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApprovalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
