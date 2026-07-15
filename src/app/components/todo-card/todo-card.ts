import { Component, computed, input, output } from '@angular/core';
import { Todo, TodoColor } from '../../models/todo.model';

const COLOR_CLASSES: Record<TodoColor, string> = {
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  yellow: 'bg-yellow-100',
  pink: 'bg-pink-100',
  green: 'bg-green-100',
};

@Component({
  selector: 'app-todo-card',
  imports: [],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.css',
})
export class TodoCard {
  todo = input.required<Todo>();

  toggle = output<string>();
  delete = output<string>();

  colorClass = computed(() => COLOR_CLASSES[this.todo().color]);

  onToggle(): void {
    this.toggle.emit(this.todo().id);
  }

  onDelete(): void {
    this.delete.emit(this.todo().id);
  }
}
