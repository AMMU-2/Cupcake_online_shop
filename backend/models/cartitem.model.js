const mongoose = require('mongoose');
//defining itemSchema
const itemSchema = new mongoose.Schema({
    shoppingcartId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart', required:true },
    cakeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required:true},
    quantity:{type:Number,required:true,min:1},
    createdAt:{type:Date, default:Date.now}
});

const item = mongoose.model('Item', itemSchema);

module.exports = item;
