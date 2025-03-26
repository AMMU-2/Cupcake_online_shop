const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
    createdAt: {type:Date, default:Date.now}
});

const cart = mongoose.model('ShoppingCart', cartSchema);

module.exports = cart;