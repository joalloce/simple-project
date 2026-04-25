import express from 'express';
import { pool, initDb } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/todos', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, done, created_at FROM todos ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

app.post('/todos', async (req, res) => {
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done, created_at',
      [title]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

await initDb();
app.listen(port, () => {
  console.log(`backend listening on ${port}`);
});
