const {connectToDB} = require('./app');

async function updateProduct() {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    await productsCollection.updateOne(
        { id: 1 },
        { $set: { price: 11.99, units: 90 } }
    );
    console.log('Product updated');
}

updateProduct();
