import React, { useEffect, useState } from 'react';
import Cupcake from '../components/cupcake';
import '../css/cupcakeHome.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";
 
const CartoonCupcakes = () => {
  const [cupcakes, setCupcakes] = useState([]);// State to store cupcakes data
  const [cartShow, setCartShow] = useState(false);// State to control cart visibility
  const [cartItems, setCartItems] = useState([]); // State to store items in the cart
  const [showPopup, setShowPopup] = useState(false);// State to control popup visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();// Initializing

  const userId = localStorage.getItem("userId");
 
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/Cartoon Cupcakes')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);
 
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake));// Dispatching action to select a cupcake
    navigate("/cupcake-details");
  };

  const handleAddToCart = async (cupcake) => {
    if (!userId) {
      setShowPopup(true);// Show popup if user is not logged in
      return;
    }

    try {
      // Sending request to add cupcake to cart
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, 
          cakeId: cupcake._id,
          name: cupcake.cakeName,
          price: cupcake.price,
          quantity: 1,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add to cart");
      }

      console.log("Cart Updated:", responseData);
      setCartItems(responseData.cartItems);// Updating
      setCartShow(true);

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="main">
      <h2>Cartoon Cupcakes</h2>
      <div className="cupcake-list">
        {cupcakes.length > 0 ? (
          cupcakes.map(cupcake => (
            <Cupcake
              key={cupcake._id}
              image={cupcake.image}
              cakeName={cupcake.cakeName}
              description={cupcake.description}
              price={cupcake.price}
              categoryName={cupcake.categoryName}
              onView={() => handleView(cupcake)}
              onAddToCart={() => handleAddToCart(cupcake)}
            />
          ))
        ) : (
          <p>No cartoon cupcakes available.</p>
        )}
      </div>
      <PopupModal
            show={showPopup}
            onClose={() => setShowPopup(false)}
            onLogin={() => navigate("/login")}
          />
      <Cart 
        show={cartShow} 
        handleClose={() => setCartShow(false)}// Handling cart close action 
        userId={localStorage.getItem("userId")}  
        updateQuantity={(id, amount) => {}}
        deleteItem={(id) => {}}// Placeholder for delete item function
        
      />
    </div>
  );
};
 
export default CartoonCupcakes;
