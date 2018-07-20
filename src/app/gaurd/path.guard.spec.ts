import { TestBed, async, inject } from '@angular/core/testing';

import { PathGuard } from './path.guard';

describe('PathGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathGuard]
    });
  });

  it('should ...', inject([PathGuard], (guard: PathGuard) => {
    expect(guard).toBeTruthy();
  }));
});
