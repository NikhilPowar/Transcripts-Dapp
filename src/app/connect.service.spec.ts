import { TestBed } from '@angular/core/testing';

import { ConnectService } from './connect.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectService = TestBed.get(ConnectService);
    expect(service).toBeTruthy();
  });
});
