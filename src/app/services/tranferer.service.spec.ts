import { TestBed } from '@angular/core/testing';

import { TranfererService } from './tranferer.service';

describe('TranfererService', () => {
  let service: TranfererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranfererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
