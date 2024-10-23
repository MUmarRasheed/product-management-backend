const {connectToDB} = require('./app');

async function removeProduct() {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    await productsCollection.deleteOne({ id: 1 });
    console.log('Product removed');
}

removeProduct();
