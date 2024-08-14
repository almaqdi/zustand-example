import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? '';
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();
  },
};

export type ToDoType = {
  id: string;
  name: string;
  status: 'pending' | 'completed';
};

export type State = {
  todos: ToDoType[];
  selectedTodo: ToDoType | null;
  isFormOpen: boolean;
};

export type Action = {
  addToDo: (todo: ToDoType) => void;
  updateTodo: (todo: ToDoType) => void;
  setSelectedTodo: (todo?: ToDoType) => void;
  deleteTodo: (name: string) => void;
  setIsFormOpen: (isFormOpen: boolean) => void;
};

export const useTodoStore = create<State & Action>()(
  persist(
    (set, get) => {
      return {
        todos: [],
        selectedTodo: null,
        isFormOpen: false,
        setSelectedTodo: (todo) => set({ selectedTodo: todo }),
        setIsFormOpen: (isFormOpen) =>
          set({ isFormOpen }, false, 'setFormOpen'),
        addToDo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
        updateTodo: (todo) => {
          const target = get().todos.find((tod) => tod.id === todo.id);
          if (target) {
            target.name = todo.name;
            target.status = todo.status;
          }
          return set({ todos: [...get().todos] }); // Here necessary to use spread operator to change the memory index
        },
        deleteTodo: (name) =>
          set((state) => ({
            todos: state.todos.filter((tod) => tod.name !== name),
          })),
      };
    },
    {
      name: 'Store',
      storage: createJSONStorage(() => hashStorage),
    }
  )
);

export const useCountStore = create<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>()(
  immer((set) => ({
    count: 0,
    increment: () =>
      set((state) => {
        state.count += 1;
      }),
    decrement: () =>
      set((state) => {
        state.count -= 1;
      }),
  }))
);
