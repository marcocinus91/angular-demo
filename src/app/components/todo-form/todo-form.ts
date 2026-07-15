import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoColor } from '../../models/todo.model';
import { TeamMateService } from '../../services/team-mate.service';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  private teamMateService = inject(TeamMateService);
  teamMate = this.teamMateService.teamMates;

  colors: TodoColor[] = ['blue', 'purple', 'yellow', 'pink', 'green'];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    color: ['blue' as TodoColor, Validators.required],
    assignedTo: [null as string | null],
  });

  isOpen = false;

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description, color, assignedTo } = this.form.getRawValue();
    this.todoService.add(title!, description!, color!, assignedTo);

    this.form.reset({ title: '', description: '', color: 'blue', assignedTo: null });
    this.isOpen = false;
  }
}
