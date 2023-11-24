import { TestBed } from '@angular/core/testing';

import { MoveCacheService } from './move-cache.service';

describe('MoveCacheService', () => {
  let service: MoveCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
