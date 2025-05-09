import React from 'react';
import { format, isPast, isToday } from 'date-fns';
import { CheckCircle, Circle, Edit, Trash } from 'lucide-react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isToggling: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
  isToggling
}) => {
  const { id, title, description, dueDate, status } = task;
  const isPending = status === 'pending';
  const formattedDate = format(new Date(dueDate), 'MMM d, yyyy');
  
  const getDueDateStyles = () => {
    const date = new Date(dueDate);
    if (isPending) {
      if (isPast(date) && !isToday(date)) {
        return 'text-red-600 font-medium';
      }
      if (isToday(date)) {
        return 'text-amber-600 font-medium';
      }
    }
    return 'text-gray-600';
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border p-4 mb-3 transition-all duration-200 
        ${status === 'completed' ? 'border-l-4 border-l-green-500' : 'hover:shadow-md'}`}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggleStatus(id)}
          disabled={isToggling}
          className={`mt-1 mr-3 flex-shrink-0 transition-transform duration-200 
            ${isToggling ? 'opacity-50' : 'hover:scale-110'}
            ${isPending ? 'text-gray-400' : 'text-green-500'}`}
          aria-label={isPending ? "Mark as completed" : "Mark as pending"}
        >
          {isPending ? (
            <Circle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
        </button>
        
        <div className="flex-grow">
          <h3 className={`font-semibold text-lg ${status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {title}
          </h3>
          <p className={`text-sm mt-1 ${status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
          <div className="flex items-center mt-2">
            <span className={`text-xs ${getDueDateStyles()}`}>
              Due: {formattedDate}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1 ml-2">
          <button
            onClick={() => onEdit(id)}
            className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors duration-200"
            aria-label="Delete task"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;