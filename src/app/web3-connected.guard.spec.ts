import { TestBed, async, inject } from '@angular/core/testing';

import { Web3ConnectedGuard } from './web3-connected.guard';

describe('Web3ConnectedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3ConnectedGuard]
    });
  });

  it('should ...', inject([Web3ConnectedGuard], (guard: Web3ConnectedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
