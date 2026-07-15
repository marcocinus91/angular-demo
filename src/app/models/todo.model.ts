export interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  color: TodoColor;
  assignedTo: string | null;
}

export type TodoColor = 'blue' | 'purple' | 'yellow' | 'pink' | 'green';
