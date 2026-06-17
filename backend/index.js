const express = require('express');
const cors = require('cors');
require('./connection'); // Database connection trigger

// Import Routers
const UserRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');

const app = express();
const port = 5000;

// 1. CORS Configuration (Next.js development ke liye flexible rakha hai)
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

// 2. Body Parser Middleware (Incoming JSON data padhne ke liye compulsory hai)
app.use(express.json());

// 3. Application Routes / Base Endpoints
app.use('/user', UserRouter);       // All user requests go to userRouter.js
app.use('/product', productRouter);   // All product/itinerary requests go to productRouter.js

// Base Test Route
app.get('/', (req, res) => {
    res.send('Welcome to Travel Itinerary API - Server is running smoothly!');
});

// Global Error Handler Middleware (Server crash hone se bachayega)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server successfully started on port: ${port}`);
});