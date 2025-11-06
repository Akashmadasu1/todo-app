import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def create_connection():
    """
    Create connection to MySQL database
    """
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'todo_app'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', '')
        )
        if connection.is_connected():
            print("✅ Connected to MySQL database")
            return connection
    except Error as e:
        print(f"❌ Error connecting to MySQL: {e}")
        return None

def init_db():
    """
    Initialize database and create todos table
    """
    connection = create_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # Create todos table if it doesn't exist
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS todos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    completed BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            """)
            connection.commit()
            print("✅ Database initialized successfully")
            
        except Error as e:
            print(f"❌ Error initializing database: {e}")
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()