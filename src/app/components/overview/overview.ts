import { Component, inject, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TeamMateService } from '../../services/team-mate.service';

@Component({
  selector: 'app-overview',
  imports: [],
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

  todosByMember = computed(() => {
    const mates = this.teamMateService.teamMates();
    const todos = this.todoService.todos();

    return mates.map((mate) => ({
      mate,
      count: todos.filter((t) => t.assignedTo === mate.id).length,
    }));
  });
}
