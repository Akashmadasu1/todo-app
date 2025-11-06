from database import create_connection
from models import TodoCreate, TodoUpdate
from typing import List, Optional

def create_todo(todo: TodoCreate) -> int:
    """
    Create a new todo in database
    """
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO todos (title, description, due_date, completed) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (todo.title, todo.description, todo.due_date, todo.completed))
            connection.commit()
            print(f"✅ Todo created: {todo.title}")
            return cursor.lastrowid
        except Exception as e:
            print(f"❌ Error creating todo: {e}")
            return None
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

def get_todos() -> List[dict]:
    """
    Get all todos from database
    """
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM todos ORDER BY created_at DESC"
            cursor.execute(query)
            todos = cursor.fetchall()
            print(f"✅ Found {len(todos)} todos")
            return todos
        except Exception as e:
            print(f"❌ Error fetching todos: {e}")
            return []
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

def get_todo(todo_id: int) -> Optional[dict]:
    """
    Get a single todo by ID
    """
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM todos WHERE id = %s"
            cursor.execute(query, (todo_id,))
            todo = cursor.fetchone()
            if todo:
                print(f"✅ Found todo: {todo['title']}")
            else:
                print(f"❌ Todo {todo_id} not found")
            return todo
        except Exception as e:
            print(f"❌ Error fetching todo: {e}")
            return None
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

def update_todo(todo_id: int, todo: TodoUpdate) -> bool:
    """
    Update a todo
    """
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # Build dynamic update query based on what fields are provided
            update_fields = []
            values = []
            
            if todo.title is not None:
                update_fields.append("title = %s")
                values.append(todo.title)
            if todo.description is not None:
                update_fields.append("description = %s")
                values.append(todo.description)
            if todo.due_date is not None:
                update_fields.append("due_date = %s")
                values.append(todo.due_date)
            if todo.completed is not None:
                update_fields.append("completed = %s")
                values.append(todo.completed)
            
            if not update_fields:
                return False
                
            values.append(todo_id)
            query = f"UPDATE todos SET {', '.join(update_fields)} WHERE id = %s"
            cursor.execute(query, values)
            connection.commit()
            
            success = cursor.rowcount > 0
            if success:
                print(f"✅ Todo {todo_id} updated")
            else:
                print(f"❌ Todo {todo_id} not found for update")
            return success
        except Exception as e:
            print(f"❌ Error updating todo: {e}")
            return False
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

def delete_todo(todo_id: int) -> bool:
    """
    Delete a todo
    """
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "DELETE FROM todos WHERE id = %s"
            cursor.execute(query, (todo_id,))
            connection.commit()
            
            success = cursor.rowcount > 0
            if success:
                print(f"✅ Todo {todo_id} deleted")
            else:
                print(f"❌ Todo {todo_id} not found for deletion")
            return success
        except Exception as e:
            print(f"❌ Error deleting todo: {e}")
            return False
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()