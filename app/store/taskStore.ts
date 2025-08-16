import { create } from 'zustand';
import type { Task } from '~/types';

// Define the Task interface for type safety.

// Define the shape of our store's state and actions.
interface TaskState {
  tasks: Task[];
  // Corrected the type of the addTask parameter to not require 'completed'.
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

// Create the Zustand store.
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  addTask: (task) => {
    set((state) => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(), // Generate a unique ID
        createdAt: new Date(), // Set the creation date
        completed: false, // New tasks start as not completed
      };
      
      // Add the new task and sort the list by createdAt in descending order.
      const updatedTasks = [newTask, ...state.tasks].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      
      return { tasks: updatedTasks };
    });
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));
