import { TestBed } from '@angular/core/testing';

import { LoadTTService } from './load-tt.service';

describe('LoadTTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadTTService = TestBed.get(LoadTTService);
    expect(service).toBeTruthy();
  });
});
