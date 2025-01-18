import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[];
  tempTodo: Todo | null;
  onDeleteTodo: (todoId: number) => Promise<void>;
  onUpdateTodo: (todoId: number, updates: Partial<Todo>) => Promise<void>;
  loadingTodoIds: number[];
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  tempTodo,
  onDeleteTodo,
  onUpdateTodo,
  loadingTodoIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onUpdateTodo(todo.id, { completed: !todo.completed })}
              disabled={loadingTodoIds.includes(todo.id)}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDeleteTodo(todo.id)}
            disabled={loadingTodoIds.includes(todo.id)}
          >
            {loadingTodoIds.includes(todo.id) ? (
              <div className="loader delete-loader"></div>
            ) : (
              '×'
            )}
          </button>
        </div>
      ))}

      {tempTodo && (
        <div className="todo todo--temp" data-cy="TempTodo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              disabled
              checked={tempTodo.completed}
            />
          </label>
          <span className="todo__title">
            {tempTodo.title}
            <div className="loader loader-margin"></div>
          </span>
        </div>
      )}
    </section>
  );
};
