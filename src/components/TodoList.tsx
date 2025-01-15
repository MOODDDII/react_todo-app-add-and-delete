import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  tempTodo: Todo | null;
  onDeleteTodo: (todoId: number) => Promise<void>;
  onUpdateTodo: (todoId: number, updates: Partial<Todo>) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  tempTodo,
  onDeleteTodo,
  onUpdateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onUpdate={onUpdateTodo}
        />
      ))}

      {tempTodo && (
        <div className="todo todo--temp">
          <span className="todo__title">{tempTodo.title}</span>
          <div className="loader"></div>
        </div>
      )}
    </section>
  );
};
