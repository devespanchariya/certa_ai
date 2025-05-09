import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  createTask, 
  deleteTask, 
  getTasks, 
  toggleTaskStatus, 
  updateTask 
} from '../api/taskApi';
import { CreateTaskDTO, FilterStatus, SortDirection, Task, UpdateTaskDTO } from '../types/task';
import { compareAsc, compareDesc, parseISO } from 'date-fns';

// Key for the tasks query
const TASKS_QUERY_KEY = ['tasks'];

export const useTasks = (
  filterStatus: FilterStatus = 'all',
  sortDirection: SortDirection = 'asc',
  searchQuery: string = ''
) => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading, isError, error } = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: getTasks,
  });

  // Filter, sort, and search tasks
  const filteredAndSortedTasks = tasks
    // Filter by status
    .filter(task => {
      if (filterStatus === 'all') return true;
      return task.status === filterStatus;
    })
    // Filter by search query
    .filter(task => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    })
    // Sort by due date
    .sort((a, b) => {
      const dateA = parseISO(a.dueDate);
      const dateB = parseISO(b.dueDate);
      return sortDirection === 'asc' 
        ? compareAsc(dateA, dateB) 
        : compareDesc(dateA, dateB);
    });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskDTO) => createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    }
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: (taskData: UpdateTaskDTO) => updateTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    }
  });

  // Toggle task status mutation
  const toggleTaskStatusMutation = useMutation({
    mutationFn: (taskId: number) => toggleTaskStatus(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    }
  });

  return {
    tasks: filteredAndSortedTasks,
    isLoading,
    isError,
    error,
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    updateTask: updateTaskMutation.mutate,
    isUpdating: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
    toggleTaskStatus: toggleTaskStatusMutation.mutate,
    isToggling: toggleTaskStatusMutation.isPending,
  };
};