const express = require('express');
const router = express.Router();
// Importing wishlist controller functions
const wishListController = require('../controller/wishlist.controller');


// Route to add an item to the wishlist
router.post('/add', wishListController.addToWishList);
// Route to get the user's wishlist by user ID
router.get('/getwish/:userId', wishListController.getWishList);

module.exports = router;
