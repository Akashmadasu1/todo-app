import React, { useState, useEffect } from 'react';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch todos when component loads
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch all todos from backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoAPI.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      alert('Error fetching todos. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Function to add or update a todo
  const handleAddTodo = async (todoData, todoId = null) => {
    try {
      if (todoId) {
        // Update existing todo
        await todoAPI.updateTodo(todoId, todoData);
      } else {
        // Create new todo
        await todoAPI.createTodo(todoData);
      }
      
      fetchTodos(); // Refresh the list
      setEditingTodo(null); // Clear editing state
    } catch (error) {
      console.error('Error saving todo:', error);
      throw error;
    }
  };

  // Function to start editing a todo
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Function to delete a todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await todoAPI.deleteTodo(todoId);
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  // Function to toggle todo completion status
  const handleToggleComplete = async (todoId, completed) => {
    try {
      await todoAPI.updateTodo(todoId, { completed });
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Todo App</h1>
        <p>Stay organized and get things done!</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="app-content">
            <div className="form-section">
              <TodoForm 
                onTodoAdded={handleAddTodo}
                editingTodo={editingTodo}
                onCancelEdit={handleCancelEdit}
              />
            </div>
            
            <div className="list-section">
              {loading ? (
                <div className="loading">Loading todos...</div>
              ) : (
                <TodoList
                  todos={todos}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                  onToggleComplete={handleToggleComplete}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;