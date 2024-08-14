import { produce } from 'immer';
import { useTodoStore } from './Stores/ToDoStore';
// import Counter from './components/Counter';
import ToDoDrawer from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import Counter from './components/Counter';

function App() {
  const isFormOpen = useTodoStore((state) => state.isFormOpen);
  const setIsFormOpen = useTodoStore((state) => state.setIsFormOpen);

  return (
    <main className="m-5">
      <div className="d-flex align-items-center gap-3 mb-3 justify-content-between">
        <h1 className="alert alert-info">ToDo List</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {!isFormOpen ? 'Add Todo' : 'Close'}
        </button>
      </div>
      <ToDoList />
      <Counter />
      {isFormOpen && <ToDoDrawer />}
    </main>
  );
}

export default App;

const person = {
  name: 'Jone',
  age: 19,
  address: {
    city: 'Mukalla',
    nested: {
      deep: {
        value: 'SS',
      },
    },
  },
};

const updatedPerson = produce(person, (draft) => {
  draft.address.nested.deep.value = 'WWW';
});

console.log(person);
console.log(updatedPerson);
