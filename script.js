// Function to fetch all students from the backend
function fetchStudents() {
    fetch('http://localhost:3000/students')
        .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => console.error('Error fetching students:', error));
}

// Function to validate the email
function validateEmail(email) {
    const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(email);
}

function validateGPA(gpa) {
    const gpaValue = parseFloat(gpa);
    console.log('GPA Value:', gpaValue);
    return !isNaN(gpaValue) && gpaValue >= 3 && gpaValue <= 10;
}

function validateAge(age) {
    const ageValue = parseInt(age, 10);
    console.log('Age Value:', ageValue);
    return !isNaN(ageValue) && ageValue >= 10 && ageValue <= 70;
}

// Function to add or update a student
function addOrUpdateStudent() {
    const studentId = document.getElementById('studentId').value;
    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        gpa: document.getElementById('gpa').value,
        degree: document.getElementById('degree').value
    };

    // Validate email, GPA, and age
    if (!validateEmail(studentData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validateGPA(studentData.gpa)) {
        alert('GPA should be between 3 and 10...!');
        return;
    }

    if (!validateAge(studentData.age)) {
        alert('Age should be between 10 and 70...!');
        return;
    }

    if (studentId) {
        // Update student
        fetch(`http://localhost:3000/students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Student updated successfully');
            fetchStudents();  // Refresh the table
            clearForm();      // Clear the form
        })
        .catch(error => console.error('Error updating student:', error));
    } else {
        // Add student
        fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Student added successfully');
            fetchStudents();  // Refresh the table
            clearForm();      // Clear the form
        })
        .catch(error => console.error('Error adding student:', error));
    }
}

// Function to populate the table with student data
function populateTable(students) {
    const tableBody = document.getElementById('tbody');
    tableBody.innerHTML = '';  // Clear previous data

    students.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.gpa}</td>
            <td>${student.degree}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to edit a student
function editStudent(id) {
    fetch(`http://localhost:3000/students/${id}`)
        .then(response => response.json())
        .then(student => {
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('age').value = student.age;
            document.getElementById('gpa').value = student.gpa;
            document.getElementById('degree').value = student.degree;
            document.getElementById('studentId').value = student.id; // Store student ID for updating
            document.getElementById('submit').textContent = 'Update Student';  // Change button text
        })
        .catch(error => console.error('Error fetching student:', error));
}

// Function to delete a student
function deleteStudent(id) {
    fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Student deleted successfully');
        fetchStudents();  // Refresh the table
    })
    .catch(error => console.error('Error deleting student:', error));
}

// Function to search for students
function search() {
    const input = document.getElementById('search').value.toUpperCase();
    const rows = document.getElementById('tbody').getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        const name = cells[1].textContent || cells[1].innerText;
        const email = cells[2].textContent || cells[2].innerText;
        const degree = cells[5].textContent || cells[5].innerText;

        if (name.toUpperCase().includes(input) || email.toUpperCase().includes(input) || degree.toUpperCase().includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Clear the form after submission
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gpa').value = '';
    document.getElementById('degree').value = '';
    document.getElementById('studentId').value = '';
    document.getElementById('submit').textContent = 'Add Student';  // Reset button text
}

// Fetch students when the page loads
window.onload = fetchStudents;
