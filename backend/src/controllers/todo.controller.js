const todoService = require('../services/todo.service');

const getTodos = (req, res) => {
  const todos = todoService.getAllTodos();
  res.json(todos);
};

const createTodo = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = todoService.createTodo(req.body.title);
  res.status(201).json(newTodo);
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const isDeleted = todoService.deleteTodo(id);
  
  if (isDeleted) {
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

module.exports = { getTodos, createTodo, deleteTodo };