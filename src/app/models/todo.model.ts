export interface Todo {
    id: string;
    title: string;
    description: string;
    date: string;
    completed: boolean;
    color: TodoColor;
}

export type TodoColor = 'blue' | 'purple' | 'yellow' | 'pink' | 'green';