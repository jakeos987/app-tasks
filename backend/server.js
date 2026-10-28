const express = require('express');
const cors = require('cors');
const todoRoutes = require('./src/routes/todo.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// רישום הראוטים תחת נתיב בסיס
app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});