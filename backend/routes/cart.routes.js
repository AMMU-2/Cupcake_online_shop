const express = require("express");
// Importing cart controller functions
const { addToCart, getCartWithTotal,updateCart, removeFromCart } = require("../controller/cart.controller");
 
const router = express.Router();
 

router.post("/add", addToCart); // Route to add an item to the cart

router.get("/:userId", getCartWithTotal); // Route to get the cart details with the total amount

router.put('/update', updateCart); // Route to update an item in the cart

router.delete("/remove/:cartItemId", removeFromCart); // Route to remove an item from the cart
 
module.exports = router;
