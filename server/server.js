import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPath = path.join(__dirname, 'data.sqlite');
sqlite3.verbose();
const db = new sqlite3.Database(dbPath);

// Initialize schema
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  );
});

// API routes
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/items/:id', (req, res) => {
  db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body || {};
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required' });
  }
  const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
  stmt.run([name.trim(), description || null], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM items WHERE id = ?', [this.lastID], (gErr, row) => {
      if (gErr) return res.status(500).json({ error: gErr.message });
      res.status(201).json(row);
    });
  });
});

app.put('/api/items/:id', (req, res) => {
  const { name, description } = req.body || {};
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required' });
  }
  const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?');
  stmt.run([name.trim(), description || null, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (gErr, row) => {
      if (gErr) return res.status(500).json({ error: gErr.message });
      res.json(row);
    });
  });
});

app.delete('/api/items/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM items WHERE id = ?');
  stmt.run([req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  });
});

// Serve static files (root project directory) so crud.html loads
const publicRoot = path.join(__dirname, '..');
app.use(express.static(publicRoot));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Open CRUD UI at http://localhost:${PORT}/crud.html`);
});


