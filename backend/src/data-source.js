const { DataSource } = require('typeorm');
const Todo = require('./entities/todo.entity');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '/app/data/todos.sqlite', // הנתיב שנעגן אליו את ה-PVC ב-OpenShift
  synchronize: true, // מורה ל-TypeORM לייצר את הטבלאות אוטומטית לפי ה-Entities
  entities: [Todo], // הרישום של המודל שיצרנו בשלב הקודם
});

module.exports = AppDataSource;