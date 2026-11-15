const express = require('express');
const cors = require('cors');
const todoRoutes = require('./src/routes/todo.routes');
const AppDataSource = require('./src/data-source'); // ייבוא אובייקט החיבור שיצרנו

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://frontend-ui-jakeos-dev.apps.rm3.7wse.p1.openshiftapps.com'
  ]
}));
app.use(express.json());

// רישום הראוטים תחת נתיב בסיס
app.use('/api/todos', todoRoutes);

// אתחול מסד הנתונים ורק אז הפעלת השרת
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized! SQLite DB is ready.');
    
    app.listen(port, () => {
      console.log(`Backend is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
    process.exit(1); // עוצר את התהליך אם מסד הנתונים לא הצליח לעלות
  });