const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');

const historyRoutes = require('./routes/history');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', weatherRoutes);
app.use('/api', historyRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
