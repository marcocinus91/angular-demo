import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMates } from './team-mates';

describe('TeamMates', () => {
  let component: TeamMates;
  let fixture: ComponentFixture<TeamMates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMates],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
