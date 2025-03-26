const express = require("express");
const { addToCart, getCartWithTotal,updateCart, removeFromCart } = require("../controller/cart.controller");
 
const router = express.Router();
 

router.post("/add", addToCart);
 

router.get("/:userId", getCartWithTotal);

router.put('/update', updateCart)

router.delete("/remove/:cartItemId", removeFromCart);
 
module.exports = router;