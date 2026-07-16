import { Component, inject, signal, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoCard } from '../todo-card/todo-card';
import { TodoForm } from '../todo-form/todo-form';
import { Todo } from '../../models/todo.model';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Icon } from '../ui/icon/icon';

type Tab = 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCard, TodoForm, DragDropModule, Icon],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private todoService = inject(TodoService);

  activeTab = signal<Tab>('active');
  searchQuery = signal('');
  editingTodo = signal<Todo | null>(null);

  private tabFilteredTodos = computed(() =>
    this.activeTab() === 'active'
      ? this.todoService.activeTodos()
      : this.todoService.completedTodos(),
  );

  visibleTodos = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const todos = this.tabFilteredTodos();

    if (!query) return todos;

    return todos.filter(
      (t) => t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query),
    );
  });

  canReorder = computed(() => this.activeTab() === 'active' && this.searchQuery().trim() === '');

  onDrop(event: CdkDragDrop<Todo[]>): void {
    if (!this.canReorder()) return;
    this.todoService.reorder(event.previousIndex, event.currentIndex);
  }

  setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }

  onToggle(id: string): void {
    this.todoService.toggleComplete(id);
  }

  onDelete(id: string): void {
    this.todoService.remove(id);
  }

  onEdit(todo: Todo): void {
    this.editingTodo.set(todo);
  }

  onFormClosed(): void {
    this.editingTodo.set(null);
  }
}
