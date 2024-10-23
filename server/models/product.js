const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: false, maxlength: 50 },
    description: { type: String, required: false, maxlength: 255 },
    price: { type: Number, required: false },
    units: { type: Number, required: false },
    id: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);
