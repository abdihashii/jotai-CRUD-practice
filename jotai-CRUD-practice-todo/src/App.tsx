import React, { FormEvent } from 'react';
import { atom, useAtom } from 'jotai';

type Todo = {
  id: number | null,
  title: string,
}

type Todos = Todo[];

const todoAtom = atom<Todo>({ id: null, title: '' });
const todoListAtom = atom<Todos>([]);

const TodoComponent = ({ todoItem }: { todoItem: Todo }) => {
  return (
    <>
      <p>{todoItem.title}</p>
    </>
  )
}

const TodoList = () => {
  const [todo, setTodo] = useAtom(todoAtom)
  const [todos, setTodos] = useAtom(todoListAtom);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTodos((prev) => [...prev, todo]);

    setTodo({ id: null, title: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>To Do</h1>
        <input
          type="text"
          placeholder='Enter a todo item'
          value={todo.title} onChange={(e) => setTodo({ id: Math.floor(Math.random() * 10000) + 1, title: e.target.value })}
        />
        <button type='submit'>Add</button>
      </form>

      {todos.map(todoItem => {
        return <React.Fragment key={todoItem.id}>
          <TodoComponent todoItem={todoItem} />
        </React.Fragment>
      })}
    </>
  )
};

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
