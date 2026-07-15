import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoCard } from '../todo-card/todo-card';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCard, TodoForm],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private todoService = inject(TodoService);

  todos = this.todoService.todos;

  onToggle(id: string): void {
    this.todoService.toggleComplete(id);
  }

  onDelete(id: string): void {
    this.todoService.remove(id);
  }
}
