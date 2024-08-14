import { useCountStore } from '../Stores/ToDoStore';

const Counter = () => {
  const counterStore = useCountStore((state) => state);
  return (
    <div className="btn-group">
      <button
        className="btn btn-success"
        onClick={() => counterStore.increment()}
      >
        +
      </button>
      <span className="btn">{counterStore.count}</span>
      <button
        className="btn btn-danger"
        onClick={() => counterStore.decrement()}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
