import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { Overview } from './components/overview/overview';
import { TeamMates } from './components/team-mates/team-mates';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: Overview },
  { path: 'team-mates', component: TeamMates },
  { path: 'todo-list', component: TodoList },
];
