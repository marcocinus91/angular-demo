import { Injectable, signal, computed } from '@angular/core';
import { Todo, TodoColor } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoSignal = signal<Todo[]>([
    {
      id: crypto.randomUUID(),
      title: 'Team Meeting',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      date: '10:30 AM - 12:00 PM',
      completed: false,
      color: 'blue',
      assignedTo: null,
    },
    {
      id: crypto.randomUUID(),
      title: 'Work on Branding',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      date: '10:30 AM - 12:00 PM',
      completed: false,
      color: 'purple',
      assignedTo: null,
    },
  ]);

  todos = this.todoSignal.asReadonly();

  activeTodos = computed(() => this.todoSignal().filter((t) => !t.completed));
  completedTodos = computed(() => this.todoSignal().filter((t) => t.completed));

  add(title: string, description: string, color: TodoColor, assignedTo: string | null): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      date: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      completed: false,
      color,
      assignedTo: assignedTo,
    };
    this.todoSignal.update((todos) => [...todos, newTodo]);
  }

  remove(id: string): void {
    this.todoSignal.update((todos) => todos.filter((t) => t.id !== id));
  }

  toggleComplete(id: string): void {
    this.todoSignal.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }
}
