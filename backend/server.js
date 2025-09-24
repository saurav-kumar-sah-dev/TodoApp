const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use('/api/tasks', taskRoutes);

// ✅ Serve static frontend files
app.use(express.static(path.resolve(__dirname, '../frontend')));

// ✅ Fallback for all unknown routes (fixed)
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

// ✅ MongoDB Atlas connection
mongoose.connect(
  'Here your own mongo url',
  {
    ssl: true,
    serverSelectionTimeoutMS: 5000
  }
)
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
