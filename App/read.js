const {connectToDB} = require('./app');

async function readProducts() {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    const products = await productsCollection.find({}).toArray();
    console.log(products);
}

readProducts();
