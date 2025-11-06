import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No todos yet!</h3>
        <p>Add your first todo to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h3>Your Todos ({todos.length})</h3>
      <div className="todos-container">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;