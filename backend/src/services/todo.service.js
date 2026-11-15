const AppDataSource = require('../data-source');

const getRepository = () => AppDataSource.getRepository('Todo');

const getAllTodos = () => {
  return getRepository().find();
};

const createTodo = (title) => {
  return getRepository().save({ title });
};

const deleteTodo = async (id) => {
  const result = await getRepository().delete(id);
  return result.affected > 0;
};

module.exports = { getAllTodos, createTodo, deleteTodo };
