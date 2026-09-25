import { TestBed } from '@angular/core/testing';

import { ProductsS } from './products';

describe('Products', () => {
  let service: ProductsS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
