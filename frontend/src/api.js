// משתמשים במשתנה סביבה עבור OpenShift, עם Fallback לפיתוח מקומי
const API_URL = import.meta.env.VITE_API_URL
  || 'https://backend-api-jakeos-dev.apps.rm3.7wse.p1.openshiftapps.com/api/todos';
const AUTH_URL = API_URL.replace(/\/todos\/?$/, '/auth/login');

const request = async (url, options = {}) => {
  const headers = { ...options.headers };
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
};

export const login = (username, password) => request(AUTH_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});

export const getTodos = (page = 1) => request(`${API_URL}?page=${page}`);

export const createTodo = (title) => request(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title })
});

export const deleteTodo = (id) => request(`${API_URL}/${id}`, {
  method: 'DELETE'
});