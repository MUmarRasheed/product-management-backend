const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDB } = require('../App/app'); // Correct path
const productRoutes = require('./routes/productRoutes'); // Make sure your routes path is correct

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

async function startServer() {
    try {
        // Connect to MongoDB using the connectToDB function
        const db = await connectToDB();
        
        // Attach the DB instance to the request object for use in routes
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Define routes
        app.use('/api', productRoutes);

        // Start the server after successful connection
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
    }
}

startServer();
