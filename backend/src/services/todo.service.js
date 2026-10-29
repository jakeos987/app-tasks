let tasks = [
  { id: 1, title: ' UI להגביל את ה' },
  { id: 2, title: 'להאיץ את האפליקציה' },
  { id: 3, title: 'לעדכן את התיעוד' }
];
let nextId = 4;

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