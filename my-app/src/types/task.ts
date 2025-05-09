export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // ISO format date string
  status: TaskStatus;
  createdAt: string; // ISO format date string
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  id: number;
}

export type SortDirection = 'asc' | 'desc';
export type FilterStatus = 'all' | TaskStatus;