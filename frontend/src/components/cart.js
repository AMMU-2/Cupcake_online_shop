
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Table } from "react-bootstrap";
import "../css/cart.css";
import { setUser } from "../redux/cartSlice"; 

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const userId = useSelector((state) => state.auth.userId); 

  useEffect(() => {
    if (show) {
      fetchCartItems();
    }
  }, [show]);

  
  const fetchCartItems = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const response = await fetch(`http://localhost:5000/cart/${userId}`);

      if (!response.ok) throw new Error("Failed to fetch cart items.");

      const data = await response.json();
      setCartItems(data.cartItems);
      setTotalPrice(data.totalPrice);
      setTotalQuantity(data.totalQuantity);

      
      dispatch(setUser({ cartItems: data.cartItems, totalQuantity: data.totalQuantity }));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch("http://localhost:5000/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shoppingcartId: cartItemId, quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      fetchCartItems(); 
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  
  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/remove/${cartItemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      fetchCartItems(); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Checkout failed");

      setCartItems([]);
      setTotalQuantity(0);
      setTotalPrice(0);

      dispatch(setUser({ cartItems: [], totalQuantity: 0 })); 
      handleClose();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cupcake Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Cupcakes</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.cakeId?.cakeName || "Unnamed Item"}</td>
                  <td>Rs. {(item.cakeId?.price ? Number(item.cakeId.price) : 0).toFixed(2)}</td>
                  <td>
                    <Button size="sm" onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</Button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <Button size="sm" onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item._id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="cart-summary">
          <p><strong>Total Items:</strong> {totalQuantity}</p>
          <p><strong>Total Price:</strong> Rs. {totalPrice.toFixed(2)}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        {cartItems.length > 0 && (
          <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
