const { connectToDB } = require("./app");

// add.js
const dropProductsCollection = require("./drop");

async function addProducts() {
  await dropProductsCollection(); // Drop the collection before adding products
  const db = await connectToDB();
  const productsCollection = db.collection("products");
  await productsCollection.insertMany([
    {
      id: 1,
      name: "Product 1",
      description: "Desc 1",
      price: 9.99,
      units: 100,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Desc 2",
      price: 19.99,
      units: 50,
    },
    {
      id: 3,
      name: "Product 3",
      description: "Desc 3",
      price: 29.99,
      units: 30,
    },
  ]);
  console.log("Products added");
}

addProducts();
