import { TestBed } from '@angular/core/testing';

import { IpfsService } from './ipfs.service';

describe('IpfsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpfsService = TestBed.get(IpfsService);
    expect(service).toBeTruthy();
  });
});
