import { Component, inject, signal, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoCard } from '../todo-card/todo-card';
import { TodoForm } from '../todo-form/todo-form';

type Tab = 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCard, TodoForm],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private todoService = inject(TodoService);

  activeTab = signal<Tab>('active');

  visibleTodos = computed(() =>
    this.activeTab() === 'active'
      ? this.todoService.activateTodos()
      : this.todoService.completedTodos(),
  );

  setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }

  onToggle(id: string): void {
    this.todoService.toggleComplete(id);
  }

  onDelete(id: string): void {
    this.todoService.remove(id);
  }
}
