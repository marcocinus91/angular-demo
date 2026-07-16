import { Component, computed, input, output } from '@angular/core';
import { Todo, TodoColor } from '../../models/todo.model';
import { Icon } from '../ui/icon/icon';

const COLOR_CLASSES: Record<TodoColor, string> = {
  blue: 'todo-card--blue',
  purple: 'todo-card--purple',
  yellow: 'todo-card--yellow',
  pink: 'todo-card--pink',
  green: 'todo-card--green',
};

@Component({
  selector: 'app-todo-card',
  imports: [Icon],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.css',
})
export class TodoCard {
  todo = input.required<Todo>();

  toggle = output<string>();
  delete = output<string>();
  edit = output<Todo>();

  colorClass = computed(() => COLOR_CLASSES[this.todo().color]);

  onToggle(): void {
    this.toggle.emit(this.todo().id);
  }

  onDelete(): void {
    this.delete.emit(this.todo().id);
  }

  onEdit(): void {
    this.edit.emit(this.todo());
  }
}
