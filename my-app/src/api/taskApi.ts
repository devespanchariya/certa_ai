import { CreateTaskDTO, Task, UpdateTaskDTO } from '../types/task';

// Mock data
let tasks: Task[] = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Finish the project proposal document for the client meeting',
    dueDate: '2025-05-10T00:00:00.000Z',
    status: 'pending',
    createdAt: '2025-05-01T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Set up team meeting',
    description: 'Schedule a team meeting to discuss project progress',
    dueDate: '2025-05-05T00:00:00.000Z',
    status: 'completed',
    createdAt: '2025-05-01T11:30:00.000Z'
  },
  {
    id: 3,
    title: 'Prepare presentation slides',
    description: 'Create slides for the client presentation next week',
    dueDate: '2025-05-12T00:00:00.000Z',
    status: 'pending',
    createdAt: '2025-05-02T09:45:00.000Z'
  },
  {
    id: 4,
    title: 'Review code pull requests',
    description: 'Review and merge team pull requests for the new feature',
    dueDate: '2025-05-04T00:00:00.000Z',
    status: 'pending',
    createdAt: '2025-05-02T14:15:00.000Z'
  },
  {
    id: 5,
    title: 'Update documentation',
    description: 'Update the project documentation with the latest changes',
    dueDate: '2025-05-08T00:00:00.000Z',
    status: 'completed',
    createdAt: '2025-05-03T13:20:00.000Z'
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API calls
export const getTasks = async (): Promise<Task[]> => {
  await delay(800);
  return [...tasks];
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  await delay(500);
  return tasks.find(task => task.id === id);
};

export const createTask = async (taskData: CreateTaskDTO): Promise<Task> => {
  await delay(800);
  const newTask: Task = {
    id: Date.now(),
    ...taskData,
    createdAt: new Date().toISOString()
  };
  tasks = [...tasks, newTask];
  return newTask;
};

export const updateTask = async (taskData: UpdateTaskDTO): Promise<Task> => {
  await delay(800);
  const taskIndex = tasks.findIndex(task => task.id === taskData.id);
  
  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskData.id} not found`);
  }
  
  const updatedTask = { ...tasks[taskIndex], ...taskData };
  tasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)];
  
  return updatedTask;
};

export const deleteTask = async (id: number): Promise<void> => {
  await delay(800);
  tasks = tasks.filter(task => task.id !== id);
};

export const toggleTaskStatus = async (id: number): Promise<Task> => {
  await delay(500);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  
  const task = tasks[taskIndex];
  const updatedTask = { 
    ...task, 
    status: task.status === 'pending' ? 'completed' : 'pending' 
  };
  
  tasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)];
  
  return updatedTask;
};