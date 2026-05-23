// 1. Load environment variables at the absolute top
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Global Middleware
app.use(express.json()); // Parses incoming JSON request bodies

// Request Logger (Only logs in development mode)
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    app.use(morgan('dev'));
}

// 3. Base Route (For simple health checks)
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: "Welcome to the Alfido Tech CRUD API Service" 
    });
});

// 4. Mount API Routers
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// 5. Database Connection & Server Startup
// Uses .env variable if available, otherwise falls back to local MongoDB default port 27017
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alfido_crud';

mongoose.connect(dbURI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        // Start the Express server only after a successful database connection
        app.listen(PORT, () => {
            console.log(`Server is running beautifully on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
        process.exit(1); // Stop the app process on failure
    });