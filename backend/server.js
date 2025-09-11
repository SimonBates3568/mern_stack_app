require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
//logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });     
  })
  .catch((error) => {
    console.log(error)
  })







