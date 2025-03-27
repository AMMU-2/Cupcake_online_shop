const express = require('express');
const router = express.Router();

// Importing wishlist controller function
const wishListController = require('../controller/wishlist.controller');

router.post('/add', wishListController.addToWishList); // Importing wishlist controller functions

router.get('/getwish/:userId', wishListController.getWishList); // Route to get the user's wishlist by user ID

module.exports = router;
