import { Injectable, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { Todo, TodoColor } from '../models/todo.model';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'angular-demo-todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private todoSignal = signal<Todo[]>(this.loadInitial());

  todos = this.todoSignal.asReadonly();

  activeTodos = computed(() => this.todoSignal().filter((t) => !t.completed));
  completedTodos = computed(() => this.todoSignal().filter((t) => t.completed));

  constructor() {
    effect(() => {
      const todos = this.todoSignal();
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      }
    });
  }

  private loadInitial(): Todo[] {
    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // JSON corrotto
        }
      }
    }

    return [
      {
        id: crypto.randomUUID(),
        title: 'Team Meeting',
        description: 'Sprint planning e review delle milestone del Q3',
        date: '10:30 AM - 12:00 PM',
        completed: false,
        color: 'blue',
        assignedTo: null,
      },
      {
        id: crypto.randomUUID(),
        title: 'Work on Branding',
        description: 'Aggiornamento del visual identity e revisione logo',
        date: '10:30 AM - 12:00 PM',
        completed: false,
        color: 'purple',
        assignedTo: null,
      },
    ];
  }

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

  update(
    id: string,
    title: string,
    description: string,
    color: TodoColor,
    assignedTo: string | null,
  ) {
    this.todoSignal.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, title, description, color, assignedTo } : t)),
    );
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
