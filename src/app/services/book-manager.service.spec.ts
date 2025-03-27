import { TestBed } from '@angular/core/testing';

import { BookManagerService } from './book-manager.service';

describe('BookManagerService', () => {
  let service: BookManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
