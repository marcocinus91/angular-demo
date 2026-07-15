import { Component, inject } from '@angular/core';
import { TeamMateService } from '../../services/team-mate.service';

@Component({
  selector: 'app-team-mates',
  imports: [],
  templateUrl: './team-mates.html',
  styleUrl: './team-mates.css',
})
export class TeamMates {
  private teamMateService = inject(TeamMateService);
  teamMates = this.teamMateService.teamMates;
}
