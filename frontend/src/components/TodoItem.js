import React from 'react';

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  const handleToggle = async () => {
    try {
      await onToggleComplete(todo.id, !todo.completed);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Error updating todo. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Error deleting todo. Please try again.');
      }
    }
  };

  // Check if todo is overdue
  const isOverdue = () => {
    if (!todo.due_date || todo.completed) return false;
    const dueDate = new Date(todo.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h4 className="todo-title">{todo.title}</h4>
          <div className="todo-actions">
            <button 
              onClick={() => onEdit(todo)}
              className="btn btn-edit"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
        
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        
        <div className="todo-meta">
          {todo.due_date && (
            <div className="due-date">
              <span className={`due-text ${isOverdue() ? 'overdue' : ''}`}>
                📅 Due: {formatDate(todo.due_date)}
                {isOverdue() && <span className="overdue-badge">OVERDUE</span>}
              </span>
            </div>
          )}
        </div>
        
        <div className="todo-footer">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="checkbox"
            />
            <span className="checkmark"></span>
            Completed
          </label>
          
          <span className="todo-date">
            Created: {new Date(todo.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;