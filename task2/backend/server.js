const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'root', 
  database: 'notesApp',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});


app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching notes' });
    } else {
      res.json(results);
    }
  });
});


app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (err, results) => {
      if (err) {
        res.status(500).send({ message: 'Error adding note' });
      } else {
        res.json({ id: results.insertId, title, content });
      }
    }
  );
});


app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting note' });
    } else {
      res.send({ message: 'Note deleted' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
