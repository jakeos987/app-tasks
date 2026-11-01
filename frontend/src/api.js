// משתמשים במשתנה סביבה עבור OpenShift, עם Fallback לפיתוח מקומי
const API_URL = 'https://backend-api-jakeos-dev.apps.rm3.7wse.p1.openshiftapps.com/api/todos';

export const getTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createTodo = async (title) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};