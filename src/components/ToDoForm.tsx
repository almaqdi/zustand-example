import { Drawer } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { useTodoStore } from '../Stores/ToDoStore';

const ToDoDrawer = () => {
  const isFormOpen = useTodoStore((state) => state.isFormOpen);
  const setIsFormOpen = useTodoStore((state) => state.setIsFormOpen);
  const setSelectedTodo = useTodoStore((state) => state.setSelectedTodo);
  const addToDo = useTodoStore((state) => state.addToDo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const selectedTodo = useTodoStore((state) => state.selectedTodo);

  const [name, setName] = useState(selectedTodo?.name ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    setIsFormOpen(false);
    setSelectedTodo();
  };
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  return (
    <Drawer
      open={isFormOpen}
      onClose={onClose}
      PaperProps={{ className: 'bg-dark' }}
    >
      <div className="m-3 bg-dark" style={{ width: 700 }}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          ref={inputRef}
          defaultValue={selectedTodo?.name}
        />
        <button
          className="btn btn-warning me-2"
          onClick={() => {
            if (!selectedTodo)
              addToDo({ id: uuidv4(), name, status: 'pending' });
            else updateTodo({ ...selectedTodo, name });
            onClose();
          }}
        >
          Save
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </Drawer>
  );
};

export default ToDoDrawer;
