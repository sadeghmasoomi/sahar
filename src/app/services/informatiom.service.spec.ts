import { TestBed } from '@angular/core/testing';

import { InformatiomService } from './informatiom.service';

describe('InformatiomService', () => {
  let service: InformatiomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformatiomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
