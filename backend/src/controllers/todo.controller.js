const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const page = Number(req.query.page || 1);
  if (!Number.isSafeInteger(page) || page < 1) {
    return res.status(400).json({ error: 'Page must be a positive integer' });
  }
  const result = await todoService.getTodos(page);
  res.json(result);
};

const createTodo = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = await todoService.createTodo(req.body.title);
  res.status(201).json(newTodo);
};

const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id);
  const isDeleted = await todoService.deleteTodo(id);
  
  if (isDeleted) {
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

module.exports = { getTodos, createTodo, deleteTodo };