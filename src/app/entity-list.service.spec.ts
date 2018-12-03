import { TestBed } from '@angular/core/testing';

import { EntityListService } from './entity-list.service';

describe('EntityListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityListService = TestBed.get(EntityListService);
    expect(service).toBeTruthy();
  });
});
