const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON request body

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',  // Replace with your MySQL root password
    database: 'student_management'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Get all students
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single student by ID
app.get('/students/:id', (req, res) => {
    const query = 'SELECT * FROM students WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Helper function for validation
function validateStudentData(name, email, age, gpa, degree) {
    // Check for missing fields
    if (!name || !email || !age || !gpa || !degree) {
        return { error: 'All fields are required.' };
    }

    // // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        return { error: 'Invalid email format.' };
    }

    // GPA validation (3 to 10)
    const gpaValue = parseFloat(gpa);
    if (gpaValue <= 3 || gpaValue >= 10) {
        return { error: 'GPA must be between 3 and 10.' };
    }

    // Age validation (10 to 70)
    const ageValue = parseInt(age, 10);
    if (ageValue <= 10 || ageValue >= 70) {
        return { error: 'Age must be between 10 and 70.' };
    }

    // Degree validation
    const validDegrees = ['CSE', 'ECE', 'EEE', 'MME', 'ME', 'CE', 'CHE', 'BT', 'IT'];
    if (!validDegrees.includes(degree)) {
        return { error: 'Invalid degree selection.' };
    }

    // If all validations pass
    return null;
}

// Add a new student
app.post('/students', (req, res) => {
    const { name, email, age, gpa, degree } = req.body;

    // Call the validation function
    const validationError = validateStudentData(name, email, age, gpa, degree);
    if (validationError) {
        return res.status(400).json(validationError);
    }
    
    // Check for an available ID
    const getAvailableIdQuery = 'SELECT id FROM deleted_ids ORDER BY id LIMIT 1';
    db.query(getAvailableIdQuery, (err, results) => {
        if (err) throw err;

        let newId = null;
        if (results.length > 0) {
            newId = results[0].id;
            // Remove the ID from the deleted_ids table
            const deleteIdQuery = 'DELETE FROM deleted_ids WHERE id = ?';
            db.query(deleteIdQuery, [newId], err => {
                if (err) throw err;
            });
        } else {
            // No available ID, get the next ID from the students table
            const getNextIdQuery = 'SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM students';
            db.query(getNextIdQuery, (err, results) => {
                if (err) throw err;
                newId = results[0].nextId;
                
                // Insert the new student
                const insertStudentQuery = 'INSERT INTO students (id, name, email, age, gpa, degree) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(insertStudentQuery, [newId, name, email, age, gpa, degree], (err, result) => {
                    if (err) throw err;
                    res.json({ id: newId, name, email, age, gpa, degree });
                });
            });
            return;
        }

        // Insert the new student
        const insertStudentQuery = 'INSERT INTO students (id, name, email, age, gpa, degree) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertStudentQuery, [newId, name, email, age, gpa, degree], (err, result) => {
            if (err) throw err;
            res.json({ id: newId, name, email, age, gpa, degree });
        });
    });
});

// Update a student
app.put('/students/:id', (req, res) => {
    const { name, email, age, gpa, degree } = req.body;

    // Call the validation function
    const validationError = validateStudentData(name, email, age, gpa, degree);
    if (validationError) {
        return res.status(400).json(validationError);
    }

    const query = 'UPDATE students SET name = ?, email = ?, age = ?, gpa = ?, degree = ? WHERE id = ?';
    db.query(query, [name, email, age, gpa, degree, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ id: req.params.id, name, email, age, gpa, degree });
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;

    // Add the ID to the deleted_ids table
    const addDeletedIdQuery = 'INSERT INTO deleted_ids (id) VALUES (?)';
    db.query(addDeletedIdQuery, [studentId], err => {
        if (err) throw err;

        // Delete the student record
        const deleteStudentQuery = 'DELETE FROM students WHERE id = ?';
        db.query(deleteStudentQuery, [studentId], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Student deleted successfully' });
        });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
