const Product = require('../models/product');
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await req.db.collection('products').find({}).toArray();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send({ message: 'Failed to retrieve products' });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id); // Convert the ID to ObjectId
        const product = await req.db.collection('products').findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product); // Return the found product
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).send({ message: 'Failed to retrieve product' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const productId = req.body.id;

        const existingProduct = await req.db.collection('products').findOne({ id: productId });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product ID already exists' });
        }
        const product = new Product(req.body);
        await req.db.collection('products').insertOne(product);
        res.status(201).json(product);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send({ message: 'Failed to add product' });
    }
};

// Update product
// Update product
exports.updateProduct = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);

        // Remove _id from req.body if it exists
        delete req.body._id;

        const updatedProduct = await req.db.collection('products').findOneAndUpdate(
            { _id: productId }, 
            { $set: req.body }, 
            { returnOriginal: false } // to return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send({ message: 'Failed to update product' });
    }
};


// Delete product
exports.deleteProduct = async (req, res) => {
    console.log("🚀 ~ exports.deleteProduct ~ req:", req.body)
    try {
        const productId = new ObjectId(req.params.id);
        const result = await req.db.collection('products').findOneAndDelete({ _id: productId });
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product removed successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send({ message: 'Failed to delete product' });
    }
};
