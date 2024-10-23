// drop.js
const { connectToDB } = require('./app');

async function dropProductsCollection() {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    await productsCollection.drop().catch(err => {
        if (err.codeName !== 'NamespaceNotFound') {
            console.error('Error dropping products collection:', err);
        } else {
            console.log('Products collection does not exist, no need to drop.');
        }
    });
}

module.exports = dropProductsCollection;
