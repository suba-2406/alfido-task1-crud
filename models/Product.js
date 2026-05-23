const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    price: { type: Number, required: [true, 'Product price is required'], min: 0 },
    description: { type: String, default: '' },
    category: { type: String, required: [true, 'Product category is required'] },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);