const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cakeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cake'
  }]
});

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
