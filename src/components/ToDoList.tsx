import { memo } from 'react';
import { ToDoType, useTodoStore } from '../Stores/ToDoStore';

const ToDoList = memo(() => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const todos = useTodoStore((state) => state.todos);
  const setSelectedTodo = useTodoStore((state) => state.setSelectedTodo);
  const setIsFormOpen = useTodoStore((state) => state.setIsFormOpen);

  const onUpdate = (todo: ToDoType) => {
    setSelectedTodo(todo);
    setIsFormOpen(true);
  };
  return (
    <table className="table table-hover table-dark table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr>
            <td>{todo.name}</td>
            <td>
              <div
                className="alert alert-warning"
                style={{ width: 'fit-content' }}
              >
                {todo.status}
              </div>
            </td>
            <td>
              <div className="btn-group">
                <button
                  className="btn btn-warning"
                  onClick={() => onUpdate(todo)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.name)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

console.log(useTodoStore.getState().todos);
export default ToDoList;
