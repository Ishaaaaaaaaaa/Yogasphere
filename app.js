const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost', // Replace with your DB host
    user: 'root',      // Replace with your DB user
    password: '',      // Replace with your DB password
    database: 'yoga_project' // Replace with your database name
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Example route: Insert a new user
app.post('/add-user', (req, res) => {
    const { name, email, phone, membership_type } = req.body;
    const sql = `INSERT INTO users (name, email, phone, membership_type) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, email, phone, membership_type], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User added successfully.');
    });
});

// Example route: Get all users
app.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Example route: Add a yoga class
app.post('/add-class', (req, res) => {
    const { class_name, instructor_name, class_date, start_time, end_time } = req.body;
    const sql = `INSERT INTO classes (class_name, instructor_name, class_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [class_name, instructor_name, class_date, start_time, end_time], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Class added successfully.');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

