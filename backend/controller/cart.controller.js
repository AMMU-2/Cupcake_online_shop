const ShoppingCart = require("../models/shoppingcart.model");
const CartItem = require("../models/cartitem.model");
const mongoose = require("mongoose");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


exports.addToCart = async (req, res) => {
  try {
    let { userId, cakeId, quantity } = req.body;

    if (!userId || !cakeId || quantity === undefined) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    userId = userId.replace(/['"]+/g, "").trim();
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    
    userId = new mongoose.Types.ObjectId(userId);

    let cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      cart = await ShoppingCart.create({ userId });
    }

    let cartItem = await CartItem.findOne({ shoppingcartId: cart._id, cakeId });

    if (cartItem) {
      cartItem.quantity += quantity; // Update quantity
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ shoppingcartId: cart._id, cakeId, quantity });
    }

    res.status(201).json({ message: "Cake added to cart", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};


exports.getCartWithTotal = async (req, res) => {
  try {
    let { userId } = req.params;

    userId = userId.replace(/^"|"$/g, "").trim();
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const cart = await ShoppingCart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await CartItem.find({ shoppingcartId: cart._id }).populate("cakeId");

    if (!cartItems.length) {
      return res.status(200).json({ cartItems: [], totalQuantity: 0, totalPrice: 0 });
    }

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * (item.cakeId?.price || 0), 0);

    return res.status(200).json({ cartItems, totalQuantity, totalPrice });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Error fetching cart", error });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    if (!isValidObjectId(cartItemId)) {
      return res.status(400).json({ message: "Invalid cartItemId format" });
    }

    await CartItem.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Error removing item", error });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { shoppingcartId, quantity } = req.body;

    if (!shoppingcartId || quantity === undefined) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const cartItem = await CartItem.findById(shoppingcartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({ message: "Cart updated successfully", cartItem });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

