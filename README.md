# Student Management System

## Overview

The Student Management System is a web application that allows users to manage student records. It provides functionality to add, edit, delete, and search for student records. This application uses a combination of HTML, CSS, JavaScript, and a MySQL database with a Node.js server for backend operations.

## Features

- **Add Student:** Enter student details and add them to the system.
- **Edit Student:** Update existing student records.
- **Delete Student:** Remove student records from the system.
- **Search:** Filter students by name, email, or degree.
- **Responsive Design:** Adaptable UI for different screen sizes.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MySQL

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/) installed

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system

2. **Install Dependencies**

   Navigate to the project directory and install the required Node.js packages:
   npm init -y
   npm install express mysql2 cors

3. **Set Up MySQL Database**
   
  - **Create the Database:**
    - Log in to your MySQL server and create a new database:
      
    sql
    CREATE DATABASE student_management;

  - **Create the Tables**
    - Switch to the newly created database and create the students and deleted_ids tables by running the following SQL schema:

    ```sql
    USE student_management;

    -- Create the students table
    CREATE TABLE students (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        gpa DECIMAL(3,1) CHECK (gpa BETWEEN 3 AND 10),
        age INT CHECK (age BETWEEN 10 AND 70),
        degree VARCHAR(50) CHECK (degree IN ('CSE', 'ECE', 'EEE', 'MME', 'ME', 'CE', 'CHE', 'BT', 'IT'))
    );
    
    -- Create the deleted_ids table
    CREATE TABLE deleted_ids (
        ID INT PRIMARY KEY
    );

4. **Configure the Server**

- **Edit Database Configuration**
  Open server.js and configure the MySQL connection with your database credentials. Update the following section with your MySQL user, password, and database name:

  ```javascript
  const mysql = require('mysql');

  const db = mysql.createConnection({
      host: 'localhost',
      user: 'yourusername', // Replace with your MySQL username
      password: 'yourpassword', // Replace with your MySQL password
      database: 'student_management' // Replace with your MySQL database name
  });
  
  db.connect((err) => {
      if (err) {
          console.error('Database connection failed:', err.stack);
          return;
      }
      console.log('Connected to the database.');
  });

- **Ensure Dependencies**
  - Ensure that the following packages are included in your package.json:
  
  ```json
  "dependencies": {
    "express": "^4.17.1",
    "mysql": "^2.18.1",
    "body-parser": "^1.19.0"
  }

5. **Run the Application**
   - Start the Node.js server:

   ```bash
   node server.js

   - Open your web browser and navigate to http://localhost:3000 to access the application.
