// Simple Node.js + Express + SQLite CRUD page
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('crud_example.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static assets (for serving HTML/CSS if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Create the table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);
});

// Main page: List and form
app.get('/', (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) return res.status(500).send('Error reading from database');
    // Basic HTML for CRUD form and table
    res.send(`
      <h2>CRUD Example with SQLite</h2>
      <form method="POST" action="/create">
        <input name="name" placeholder="Name" required>
        <input name="description" placeholder="Description">
        <button type="submit">Add</button>
      </form>
      <hr>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr><th>ID</th><th>Name</th><th>Description</th><th>Actions</th></tr>
        ${rows.map(item => `
          <tr>
            <td>${item.id}</td>
            <td>
              <form method="POST" action="/update/${item.id}" style="display:inline;">
                <input name="name" value="${item.name}" required>
                <input name="description" value="${item.description||''}">
                <button type="submit">Update</button>
              </form>
            </td>
            <td>${item.description||''}</td>
            <td>
              <form method="POST" action="/delete/${item.id}" style="display:inline;" onsubmit="return confirm('Delete this item?');">
                <button type="submit">Delete</button>
              </form>
            </td>
          </tr>
        `).join('')}
      </table>
    `);
  });
});

// Create
app.post('/create', (req, res) => {
  const { name, description } = req.body;
  db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description],
    (err) => {
      if (err) return res.status(500).send('Failed to create item');
      res.redirect('/');
    }
  );
});

// Update
app.post('/update/:id', (req, res) => {
  const { name, description } = req.body;
  db.run(
    'UPDATE items SET name=?, description=? WHERE id=?',
    [name, description, req.params.id],
    (err) => {
      if (err) return res.status(500).send('Failed to update item');
      res.redirect('/');
    }
  );
});

// Delete
app.post('/delete/:id', (req, res) => {
  db.run('DELETE FROM items WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send('Failed to delete item');
    res.redirect('/');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('CRUD app listening on port', PORT);
});
