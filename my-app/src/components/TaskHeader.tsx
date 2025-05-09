import React from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskHeaderProps {
  onCreateTask: () => void;
  taskCount: number;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onCreateTask, taskCount }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <p className="text-gray-600 mt-1">
          {taskCount > 0 
            ? `You have ${taskCount} task${taskCount === 1 ? '' : 's'}`
            : 'No tasks yet'}
        </p>
      </div>
      
      <button
        onClick={onCreateTask}
        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
      >
        <PlusCircle className="h-4 w-4" />
        <span>New Task</span>
      </button>
    </div>
  );
};

export default TaskHeader;