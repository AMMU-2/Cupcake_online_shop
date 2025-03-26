const WishList = require('../models/wishlist.model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.addToWishList = (req, res) => {
    const { userId, cakeId } = req.body;
    console.log(req.body);
  
    const cakeIds = Array.isArray(cakeId) ? cakeId.map(id => new ObjectId(id)) : [new ObjectId(cakeId)];
  
    WishList.findOne({ userId: userId })
      .then(wishList => {
        console.log(wishList);
        if (!wishList) {
          const newWishList = new WishList({
            userId: userId,
            cakeId: cakeIds
          });
          return newWishList.save();
        } else {
          wishList.cakeId.push(...cakeIds);
          wishList.save()
          .then(response=>res.send(response))
          .catch(error=>res.send({message:'Error',data:error}));
        }
      })
      .then(() => res.status(200).json({ message: 'Cupcake added to wish list' }))
      .catch(error => res.status(500).json({ message: 'Error adding to wish list', error }));
};


exports.getWishList = (req, res) => {
  const userId = req.params.userId;

  WishList.findOne({ userId: userId })
    .populate('cakeId')
    .then(wishList => {
      if (!wishList) {
        return res.status(404).json({ message: 'No wish list found for this user' });
      }
      return res.status(200).json(wishList);
    })
    .catch(error => {
      console.error('Error fetching wish list:', error);
      return res.status(500).json({ message: 'Error fetching wish list', error });
    });
};