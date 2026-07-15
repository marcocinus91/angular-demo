import { TestBed } from '@angular/core/testing';

import { TeamMate } from './team-mate';

describe('TeamMate', () => {
  let service: TeamMate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
