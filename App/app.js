const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'mydb'; // Database name

async function connectToDB() {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // Create a new MongoClient
    try {
        await client.connect(); // Connect to the MongoDB server
        console.log('Connected successfully to MongoDB');
        const db = client.db(dbName); // Select the database
        return db; // Return the database object
    } catch (err) {
        console.error('Database connection error:', err); // Log any connection errors
        throw err; // Re-throw the error for further handling
    } finally {
        // You might want to close the client if not needed after connection
        // await client.close();
    }
}

module.exports = { connectToDB }; // Export the connectToDB function
