const mongoose = require('mongoose');
//defing the cartSchema for each userid having cartid
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
    createdAt: {type:Date, default:Date.now}
});

const cart = mongoose.model('ShoppingCart', cartSchema);

module.exports = cart;
