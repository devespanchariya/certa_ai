import React from 'react';
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import { FilterStatus, SortDirection } from '../types/task';

interface TaskFiltersProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  sortDirection: SortDirection;
  onSortToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filterStatus,
  onFilterChange,
  sortDirection,
  onSortToggle,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        
        {/* Filters */}
        <div className="flex space-x-2">
          <FilterButton 
            label="All" 
            isActive={filterStatus === 'all'} 
            onClick={() => onFilterChange('all')} 
          />
          <FilterButton 
            label="Active" 
            isActive={filterStatus === 'pending'} 
            onClick={() => onFilterChange('pending')} 
          />
          <FilterButton 
            label="Completed" 
            isActive={filterStatus === 'completed'} 
            onClick={() => onFilterChange('completed')} 
          />
        </div>
        
        {/* Sort */}
        <button
          onClick={onSortToggle}
          className="flex items-center gap-1.5 px-3 py-2 border rounded-md hover:bg-gray-50 transition-colors text-sm"
          aria-label={`Sort by due date ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
        >
          <span>Due Date</span>
          {sortDirection === 'asc' ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-700 font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
};

export default TaskFilters;