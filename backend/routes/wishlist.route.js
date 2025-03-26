const express = require('express');
const router = express.Router();
const wishListController = require('../controller/wishlist.controller');

router.post('/add', wishListController.addToWishList);

router.get('/getwish/:userId', wishListController.getWishList);

module.exports = router;