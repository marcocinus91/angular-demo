import { Component, inject, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TeamMateService } from '../../services/team-mate.service';
import { Icon, IconName } from '../ui/icon/icon';

interface Stat {
  label: string;
  value: number;
  icon: IconName;
}

@Component({
  selector: 'app-overview',
  imports: [Icon],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private todoService = inject(TodoService);
  private teamMateService = inject(TeamMateService);

  totalTodos = computed(() => this.todoService.todos().length);
  activeCount = computed(() => this.todoService.activeTodos().length);
  completedCount = computed(() => this.todoService.completedTodos().length);
  teamCount = computed(() => this.teamMateService.teamMates().length);

  completionRate = computed(() => {
    const total = this.totalTodos();
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  stats = computed<Stat[]>(() => [
    { label: 'Task totali', value: this.totalTodos(), icon: 'list-checks' },
    { label: 'Attivi', value: this.activeCount(), icon: 'clock' },
    { label: 'Completati', value: this.completedCount(), icon: 'circle-check-big' },
    { label: 'Membri team', value: this.teamCount(), icon: 'users' },
  ]);

  todosByMember = computed(() => {
    const mates = this.teamMateService.teamMates();
    const todos = this.todoService.todos();

    return mates.map((mate) => ({
      mate,
      count: todos.filter((t) => t.assignedTo === mate.id).length,
    }));
  });
}
