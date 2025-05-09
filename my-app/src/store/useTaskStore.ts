import { create } from 'zustand';
import { FilterStatus, SortDirection } from '../types/task';

interface TaskStore {
  // Filter state
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  
  // Sort state
  sortDirection: SortDirection;
  toggleSortDirection: () => void;
  
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modal state
  isModalOpen: boolean;
  modalTaskId: number | null;
  openCreateModal: () => void;
  openEditModal: (taskId: number) => void;
  closeModal: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  // Filter
  filterStatus: 'all',
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  // Sort
  sortDirection: 'asc',
  toggleSortDirection: () => set((state) => ({ 
    sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc' 
  })),
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Modal
  isModalOpen: false,
  modalTaskId: null,
  openCreateModal: () => set({ isModalOpen: true, modalTaskId: null }),
  openEditModal: (taskId) => set({ isModalOpen: true, modalTaskId: taskId }),
  closeModal: () => set({ isModalOpen: false, modalTaskId: null }),
}));