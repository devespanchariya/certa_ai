import React from 'react';

const TaskFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center py-4 text-gray-500 text-sm mt-auto">
      <p>&copy; {currentYear} Task Management App</p>
    </footer>
  );
};

export default TaskFooter;