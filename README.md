# Task Management Application

A modern, responsive task management application built with React and TypeScript. Manage your tasks with ease using an intuitive interface that supports creating, editing, filtering, and sorting tasks.

## Features

- ✨ Create, edit, and delete tasks
- 🔄 Toggle task completion status
- 🔍 Filter tasks by status (All, Active, Completed)
- 📅 Sort tasks by due date
- 🔎 Search tasks by title or description
- 📱 Fully responsive design
- ⚡ Real-time updates with optimistic UI
- 🎨 Clean, modern interface

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Zustand for UI state management
- TanStack Query (React Query) for data fetching
- Tailwind CSS for styling
- Lucide React for icons
- date-fns for date manipulation

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 7.0 or higher

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/          # API service layer
├── components/   # React components
├── hooks/        # Custom React hooks
├── store/        # Zustand store
├── types/        # TypeScript types
└── utils/        # Utility functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### State Management

- **Zustand**: Manages UI state (filters, sorting, modal visibility)
- **React Query**: Handles server state and data fetching

### Data Flow

1. UI interactions trigger Zustand state updates
2. Data mutations are handled through React Query
3. Optimistic updates provide instant feedback
4. Background refetching ensures data consistency

## Current Limitations

- Uses mock API data (no persistent storage)
- No authentication/authorization
- No multi-user support
- No task categories or tags
- No recurring tasks
- No task priorities
- No data export/import

## Future Improvements

- Add persistent storage with a backend
- Implement user authentication
- Add task categories and tags
- Support for recurring tasks
- Task priority levels
- Data export/import functionality
- Collaborative features
- Dark mode support
