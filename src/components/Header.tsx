import React, { useState } from 'react';

interface HeaderProps {
  onAddTodo: (title: string) => void;
  onMarkAllAsCompleted: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo, onMarkAllAsCompleted }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAddTodo(trimmedTitle);
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all"
        data-cy="ToggleAllButton"
        onClick={onMarkAllAsCompleted}
      />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
