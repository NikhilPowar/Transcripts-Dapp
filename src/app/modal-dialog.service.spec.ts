import { TestBed } from '@angular/core/testing';

import { ModalDialogService } from './modal-dialog.service';

describe('ModalDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalDialogService = TestBed.get(ModalDialogService);
    expect(service).toBeTruthy();
  });
});
