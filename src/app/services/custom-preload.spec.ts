import { TestBed } from '@angular/core/testing';

import { CustomPreload } from './custom-preload';

describe('CustomPreload', () => {
  let service: CustomPreload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPreload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
