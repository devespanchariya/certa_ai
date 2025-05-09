import React, { useState } from 'react';
import TaskHeader from './components/TaskHeader';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import TaskFooter from './components/TaskFooter';
import { CreateTaskDTO, Task, UpdateTaskDTO } from './types/task';
import { useTaskStore } from './store/useTaskStore';
import { useTasks } from './hooks/useTasks';

function App() {
  const { 
    filterStatus, 
    setFilterStatus,
    sortDirection, 
    toggleSortDirection,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    modalTaskId,
    openCreateModal,
    openEditModal,
    closeModal
  } = useTaskStore();
  
  const {
    tasks,
    isLoading,
    isError,
    createTask,
    isCreating,
    updateTask,
    isUpdating,
    deleteTask,
    isDeleting,
    toggleTaskStatus,
    isToggling
  } = useTasks(filterStatus, sortDirection, searchQuery);
  
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleEditTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setCurrentTask(task);
      openEditModal(id);
    }
  };

  const handleSubmitTask = (taskData: CreateTaskDTO) => {
    if (modalTaskId) {
      // Update existing task
      updateTask({ id: modalTaskId, ...taskData } as UpdateTaskDTO);
    } else {
      // Create new task
      createTask(taskData);
    }
    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 max-w-3xl flex-grow">
        <TaskHeader 
          onCreateTask={() => {
            setCurrentTask(null);
            openCreateModal();
          }}
          taskCount={tasks.length}
        />
        
        <TaskFilters
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          sortDirection={sortDirection}
          onSortToggle={toggleSortDirection}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          isError={isError}
          isToggling={isToggling}
          onToggleStatus={toggleTaskStatus}
          onEdit={handleEditTask}
          onDelete={deleteTask}
        />
      </main>
      
      <TaskFooter />
      
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
        isSubmitting={isCreating || isUpdating}
        initialTask={currentTask}
        title={modalTaskId ? 'Edit Task' : 'Create New Task'}
      />
    </div>
  );
}

export default App;