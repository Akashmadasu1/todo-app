import React, { useState } from 'react';

const TodoForm = ({ onTodoAdded, editingTodo, onCancelEdit }) => {
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [dueDate, setDueDate] = useState(editingTodo?.due_date || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title for your todo!');
      return;
    }

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate || null,
      completed: editingTodo?.completed || false
    };

    try {
      await onTodoAdded(todoData, editingTodo?.id);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error saving todo:', error);
      alert('Error saving todo. Please try again.');
    }
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h3>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h3>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          placeholder="Add description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Due Date (Optional)</label>
        <input
          type="date"
          value={formatDateForInput(dueDate)}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-input"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </button>
        {editingTodo && (
          <button 
            type="button" 
            onClick={onCancelEdit}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;