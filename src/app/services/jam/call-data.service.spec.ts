import { TestBed } from '@angular/core/testing';

import { CallDataService } from './call-data.service';

describe('CallDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallDataService = TestBed.get(CallDataService);
    expect(service).toBeTruthy();
  });
});
