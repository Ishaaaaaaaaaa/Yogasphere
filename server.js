const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password', // Replace with your MySQL password
    database: 'yoga_project'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if database connection fails
    }
    console.log('Connected to the MySQL database');
});

// Serve the homepage (static files)
app.use(express.static('public'));

// API route to fetch users from the database
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Database error');
            return;
        }
        res.json(results); // Send data as a JSON response
    });
});

// Handle unhandled errors in the server
app.on('error', (err) => {
    console.error('Unhandled error:', err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
c