const AppDataSource = require('../data-source');

const tasksPerPage = Number(process.env.TASKS_PER_PAGE || 5);
if (!Number.isSafeInteger(tasksPerPage) || tasksPerPage < 1) {
  throw new Error('TASKS_PER_PAGE must be a positive integer');
}

const getRepository = () => AppDataSource.getRepository('Todo');

const getTodos = async (page) => {
  const [todos, total] = await getRepository().findAndCount({
    skip: (page - 1) * tasksPerPage,
    take: tasksPerPage,
    order: { id: 'ASC' }
  });
  return { todos, page, totalPages: Math.ceil(total / tasksPerPage) };
};

const createTodo = (title) => {
  return getRepository().save({ title });
};

const deleteTodo = async (id) => {
  const result = await getRepository().delete(id);
  return result.affected > 0;
};

module.exports = { getTodos, createTodo, deleteTodo };
