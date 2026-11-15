const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const todos = await todoService.getAllTodos();
  res.json(todos);
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