import { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    let active = true;
    getTodos()
      .then((data) => {
        if (active) setTodos(data);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        if (err.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
          setTodos([]);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await createTodo(title);
      setTodos(await getTodos());
      setTitle('');
      setError('');
    } catch (err) {
      setError(err.message);
      if (err.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setTodos([]);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(await getTodos());
      setError('');
    } catch (err) {
      setError(err.message);
      if (err.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setTodos([]);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTodos([]);
    setError('');
  };

  if (!token) {

    return (
      <h1> there is no token</h1>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>✅✅ משימות CI/CD</h1>
      <h1>Ben was here</h1>
      <button onClick={handleLogout}>התנתקות</button>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="משימה חדשה..." 
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>הוסף</button>
      </form>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid #eee' }}>
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo.id)} style={{ color: 'white', backgroundColor: '#dc3545', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
              מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;