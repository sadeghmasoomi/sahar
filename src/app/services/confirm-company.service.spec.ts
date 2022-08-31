import { TestBed } from '@angular/core/testing';

import { ConfirmCompanyService } from './confirm-company.service';

describe('ConfirmCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmCompanyService = TestBed.get(ConfirmCompanyService);
    expect(service).toBeTruthy();
  });
});
