import { useEffect, useState } from 'react';

const API = 'http://localhost:3001';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  async function load() {
    const res = await fetch(`${API}/todos`);
    setTodos(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: trimmed }),
    });
    if (res.ok) {
      setTitle('');
      await load();
    }
  }

  async function toggle(id, done) {
    const res = await fetch(`${API}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done }),
    });
    if (res.ok) await load();
  }

  async function remove(id) {
    const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    if (res.ok) await load();
  }

  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 480, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>simple todo</h1>
      <form onSubmit={add} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="new todo"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit">add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id, t.done)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: t.done ? 'line-through' : 'none',
                color: t.done ? '#888' : 'inherit',
              }}
            >
              {t.title}
            </span>
            <button onClick={() => remove(t.id)} aria-label="delete">
              ×
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
