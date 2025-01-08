import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((loadedTodos) => {
        setTodos(loadedTodos);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Unable to load todos');
        setIsLoading(false);
      });
  }, []);

  const handleAddTodo = async (title: string) => {
    if (!title.trim()) {
      setError('Title should not be empty');
      return;
    }

    const newTodo: Todo = {
      id: 0,
      userId: 1878,
      title: title.trim(),
      completed: false,
    };

    setTempTodo(newTodo);

    try {
      const createdTodo = await createTodo({
        userId: 1878,
        title: title.trim(),
        completed: false,
      });

      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setTempTodo(null);
    } catch {
      setError('Unable to add a todo');
      setTempTodo(null);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch {
      setError('Unable to delete a todo');
    }
  };

  const handleUpdateTodo = async (todoId: number, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await updateTodo(todoId, updates);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch {
      setError('Unable to update a todo');
    }
  };

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    await Promise.all(
      completedTodos.map(todo =>
        deleteTodo(todo.id).catch(() => {
          setError('Unable to delete some todos');
        })
      )
    );

    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  if (!1878) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {error && (
        <div className="notification is-danger is-light">
          <button
            type="button"
            className="delete"
            onClick={() => setError('')}
          />
          {error}
        </div>
      )}

      <Header
        onAddTodo={handleAddTodo}
        onMarkAllAsCompleted={() => {
          setTodos(prevTodos =>
            prevTodos.map(todo => ({ ...todo, completed: true }))
          );
        }}
      />

      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <TodoList
            todos={filteredTodos}
            tempTodo={tempTodo}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
          />
          <Footer
            filter={filter}
            setFilter={setFilter}
            todosCount={todos.filter((todo) => !todo.completed).length}
            clearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  );
};
