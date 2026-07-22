const mongoose = require('mongoose');

// Define the item schema 
const itemSchema = new mongoose.Schema({
    sku: { type: String, index: true },
    name: { type: String, lowercase: true, required: true, index: true },
    quantity: {type: Number, min: 0, required: true },
    description: String,
    price: Number,
    imageUrl: String,
    imagePublicId: String,

    category: { type: String, lowercase: true, index: true }
}, { timestamps: true });

const Item = mongoose.model('items', itemSchema);
module.exports = Item;