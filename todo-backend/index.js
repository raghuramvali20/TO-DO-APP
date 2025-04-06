const express = require('express');
const cors = require('cors');
const authRoutes =  require('./routes/auth')
const categoryRoutes = require('./routes/categories');
const taskRoutes = require('./routes/tasks');


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {   
  console.log(`Server is running on port ${PORT}`);
});