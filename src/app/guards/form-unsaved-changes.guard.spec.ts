import { TestBed } from '@angular/core/testing';

import { FormUnsavedChangesGuard } from './form-unsaved-changes.guard';

describe('FormUnsavedChangesGuard', () => {
  let guard: FormUnsavedChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormUnsavedChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
