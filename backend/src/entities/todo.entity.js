const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Todo',
  tableName: 'todos',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true, // מזהה אוטומטי שרץ למעלה (Auto Increment)
    },
    title: {
      type: 'varchar',
    },
    isCompleted: {
      type: 'boolean',
      default: false,
    },
  },
});