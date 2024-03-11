const express = require('express');
const projectRoutes = require('./src/routes/projectRoutes');
const projectManagerRoutes = require('./src/routes/projectManagerRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const cors = require('cors');
require('dotenv').config();
require('./src/config/db');

const app = express();
app.use(cors());
 
// Middleware to parse JSON in requests
app.use(express.json());

// Use the all routes
app.use('/api', projectRoutes);
app.use('/api', projectManagerRoutes);
app.use('/api', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
