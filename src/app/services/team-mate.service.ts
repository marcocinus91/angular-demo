import { Injectable, signal } from '@angular/core';
import { TeamMate } from '../models/team-mate.model';

@Injectable({
  providedIn: 'root',
})
export class TeamMateService {
  private teamMatesSignal = signal<TeamMate[]>([
    { id: 'tm-1', name: 'Akash Singh', role: 'Frontend Developer', avatarColor: 'bg-orange-400' },
    { id: 'tm-2', name: 'Valibhav Kumar', role: 'Backend Developer', avatarColor: 'bg-purple-400' },
    { id: 'tm-3', name: 'Sarah Foss', role: 'UI/UX Designer', avatarColor: 'bg-green-400' },
    { id: 'tm-4', name: 'Jess Teller', role: 'Project Manager', avatarColor: 'bg-blue-400' },
  ]);

  teamMates = this.teamMatesSignal.asReadonly();

  getById(id: string): TeamMate | undefined {
    return this.teamMatesSignal().find((m) => m.id === id);
  }

  add(name: string, role: string, avatarColor: string): void {
    this.teamMatesSignal.update((mates) => [
      ...mates,
      { id: crypto.randomUUID(), name, role, avatarColor },
    ]);
  }

  remove(id: string): void {
    this.teamMatesSignal.update((mates) => mates.filter((m) => m.id !== id));
  }
}
