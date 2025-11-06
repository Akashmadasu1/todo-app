from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Todo, TodoCreate, TodoUpdate
from crud import create_todo, get_todos, get_todo, update_todo, delete_todo
from database import init_db

# Initialize database - create tables if they don't exist
print("🚀 Starting Todo API...")
init_db()

# Create FastAPI application
app = FastAPI(
    title="Todo API",
    description="A simple Todo API with FastAPI and MySQL",
    version="1.0.0"
)

# Add CORS middleware to allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app will run here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    """
    Root endpoint - API welcome message
    """
    return {
        "message": "Welcome to Todo API!",
        "version": "1.0.0",
        "docs": "Visit /docs for API documentation"
    }

@app.post("/todos/", response_model=Todo)
def create_todo_endpoint(todo: TodoCreate):
    """
    Create a new todo
    """
    todo_id = create_todo(todo)
    if todo_id:
        created_todo = get_todo(todo_id)
        return created_todo
    raise HTTPException(status_code=400, detail="Could not create todo")

@app.get("/todos/", response_model=list[Todo])
def read_todos():
    """
    Get all todos
    """
    return get_todos()

@app.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id: int):
    """
    Get a specific todo by ID
    """
    todo = get_todo(todo_id)
    if todo:
        return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo_endpoint(todo_id: int, todo: TodoUpdate):
    """
    Update a todo
    """
    if update_todo(todo_id, todo):
        updated_todo = get_todo(todo_id)
        return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
def delete_todo_endpoint(todo_id: int):
    """
    Delete a todo
    """
    if delete_todo(todo_id):
        return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")

print("✅ Todo API is ready! Visit http://localhost:8000")