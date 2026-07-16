import { Component, inject, input, output, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoColor, Todo } from '../../models/todo.model';
import { TeamMateService } from '../../services/team-mate.service';
import { Button } from '../ui/button/button';
import { Icon } from '../ui/icon/icon';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, Button, Icon],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  private teamMateService = inject(TeamMateService);
  teamMate = this.teamMateService.teamMates;

  editingTodo = input<Todo | null>(null);
  closed = output<void>();

  colors: TodoColor[] = ['blue', 'purple', 'yellow', 'pink', 'green'];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    color: ['blue' as TodoColor, Validators.required],
    assignedTo: [null as string | null],
  });

  isOpen = false;

  constructor() {
    effect(() => {
      const todo = this.editingTodo();
      if (todo) {
        this.form.setValue({
          title: todo.title,
          description: todo.description,
          color: todo.color,
          assignedTo: todo.assignedTo,
        });
        this.isOpen = true;
      }
    });
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.closed.emit();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description, color, assignedTo } = this.form.getRawValue();
    const editing = this.editingTodo();

    if (editing) {
      this.todoService.update(editing.id, title!, description!, color!, assignedTo);
    } else {
      this.todoService.add(title!, description!, color!, assignedTo);
    }

    this.form.reset({ title: '', description: '', color: 'blue', assignedTo: null });
    this.isOpen = false;
    this.closed.emit();
  }
}
