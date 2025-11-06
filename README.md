# 📝 Full-Stack Todo App

A complete Todo application built with **FastAPI + MySQL** backend and **React** frontend.

## 🚀 What We've Built

### ✅ Completed Features
1. **Add New Todos** - Create tasks with titles and descriptions
2. **View All Todos** - See all your tasks in a beautiful list
3. **Edit Todos** - Update task details anytime
4. **Delete Todos** - Remove tasks you don't need
5. **Mark Complete/Incomplete** - Toggle task completion status
6. **Due Dates** - Add due dates with overdue indicators
7. **Responsive Design** - Works on desktop and mobile

### 🏗️ Project Structure
todo-app/
├── backend/ # Python FastAPI + MySQL
│ ├── main.py # FastAPI server
│ ├── database.py # MySQL connection
│ ├── models.py # Data models
│ ├── crud.py # Database operations
│ ├── .env # Environment variables
│ └── requirements.txt
└── frontend/ # React application
├── src/
│ ├── components/
│ │ ├── TodoForm.js
│ │ ├── TodoItem.js
│ │ └── TodoList.js
│ ├── services/
│ │ └── api.js
│ ├── App.js
│ └── App.css
└── package.json


## 🛠️ How It Works - Simple Explanation

### 🔧 Backend (FastAPI + MySQL)
- **FastAPI**: Creates the API server that handles requests
- **MySQL**: Database that stores all your todos permanently
- **Endpoints**: 
  - `GET /todos/` - Get all todos
  - `POST /todos/` - Create new todo
  - `PUT /todos/{id}` - Update todo
  - `DELETE /todos/{id}` - Delete todo

### 🎨 Frontend (React)
- **Components**: Building blocks of the UI
- **API Calls**: Connect to backend to get/save data
- **State Management**: Keep track of todos in memory
- **Beautiful UI**: Professional-looking interface

### 🔄 Data Flow
1. User interacts with React app (clicks, types)
2. React sends API request to FastAPI
3. FastAPI talks to MySQL database
4. Database returns data to FastAPI
5. FastAPI sends response to React
6. React updates the UI

## 🚀 How to Run

### Prerequisites
- Python 3.7+
- Node.js
- MySQL

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt

# Update .env with your MySQL credentials
uvicorn main:app --reload --host 0.0.0.0 --port 8000


Frontend Setup
cd frontend
npm install
npm start


Access Points
React App: http://localhost:3000

API Docs: http://localhost:8000/docs

Backend API: http://localhost:8000

Key Technologies Used
Backend
FastAPI - Modern Python web framework

MySQL - Relational database

mysql-connector-python - MySQL driver

Pydantic - Data validation

Frontend
React - User interface library

Axios - HTTP client for API calls

CSS3 - Styling and animations


Simple Analogy
Think of it like a restaurant:

MySQL Database = Kitchen storage (keeps ingredients)

FastAPI Backend = Kitchen staff (prepares food)

React Frontend = Dining area (where customers interact)

API Calls = Waiters (carry orders and food)

What You've Learned
Full-Stack Development - Both frontend and backend

REST APIs - How web services communicate

Database Integration - Storing and retrieving data

React Components - Building reusable UI pieces

Project Organization - Structuring code properly

🔮 Next Possible Features
Search and filter todos

Categories and tags

User accounts

Drag and drop sorting

Push notifications

