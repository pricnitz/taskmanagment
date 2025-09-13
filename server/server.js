const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/taskRoute');
require('dotenv').config();

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
});
