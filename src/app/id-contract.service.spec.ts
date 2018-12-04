import { TestBed } from '@angular/core/testing';

import { IdContractService } from './id-contract.service';

describe('IdContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdContractService = TestBed.get(IdContractService);
    expect(service).toBeTruthy();
  });
});
