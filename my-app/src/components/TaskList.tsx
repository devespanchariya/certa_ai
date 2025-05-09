import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/task';
import { Loader } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  isToggling: boolean;
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  isError,
  isToggling,
  onToggleStatus,
  onEdit,
  onDelete
}) => {
  if (isError) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100">
        <p className="text-red-600 font-medium">
          Error loading tasks. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4">
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-gray-100 p-4 animate-pulse"
          >
            <div className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-gray-200 mr-3 mt-1"></div>
              <div className="flex-grow">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-gray-600">
          No tasks found. Create a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          isToggling={isToggling}
        />
      ))}
    </div>
  );
};

export default TaskList;