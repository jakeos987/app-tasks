let tasks = [
  { id: 1, title: 'להגדיר את GitHub Actions' },
  { id: 2, title: 'לבצע Deployment ב-OpenShift' }
];
let nextId = 3;

const getAllTodos = () => {
  return tasks;
};

const createTodo = (title) => {
  const newTask = { id: nextId++, title };
  tasks.push(newTask);
  return newTask;
};

const deleteTodo = (id) => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length < initialLength;
};

module.exports = { getAllTodos, createTodo, deleteTodo };