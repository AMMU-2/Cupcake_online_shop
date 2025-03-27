import React, { useEffect, useState } from 'react';
import Cupcake from './cupcake'; 
import '../css/cupcakeHome.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "./cart";
import PopupModal from "../components/PopupModel";

const Main = ({ cupcake }) => {
  const [cupcakes, setCupcakes] = useState([]); 
  const [cartShow, setCartShow] = useState(false); 
  const [cartItems, setCartItems] = useState([]); 
  const [showPopup, setShowPopup] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Retrieve logged-in user ID from local storage

  // Fetch cupcakes from backend when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/cake/all') 
      .then((response) => response.json())
      .then((data) => {
        console.log("Response", data);
        setCupcakes(data); // Update state with fetched cupcakes
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);

  // Handle cupcake 'View' button click: stores selected cupcake in Redux and navigates to details page
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake));
    navigate("/cupcake-details");
  };

  // Handle 'Add to Cart' button click
  const handleAddToCart = async (cupcake) => {
    if (!userId) {
      setShowPopup(true); // Show login popup if user is not logged in
      return;
    }

    try {
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
      setCartItems(responseData.cartItems); // Update cart items state
      setCartShow(true); // Show cart modal

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="main">
      <h2>Featured Products</h2><br></br>
      <div className="cupcake-list">
        {cupcakes.map(cupcake => (
          <Cupcake
            key={cupcake._id}
            image={cupcake.image}
            cakeName={cupcake.cakeName}
            description={cupcake.description}
            price={cupcake.price}
            onView={() => handleView(cupcake)} // Pass function to view cupcake details
            onAddToCart={() => handleAddToCart(cupcake)} // Pass function to add cupcake to cart
          />
        ))}
      </div>

      {/* Popup modal for login prompt when trying to add to cart without logging in */}
      <PopupModal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onLogin={() => navigate("/login")}
      />

      {/* Cart component, displayed when cartShow is true */}
      <Cart 
        show={cartShow} 
        handleClose={() => setCartShow(false)} 
        userId={localStorage.getItem("userId")}  
        updateQuantity={(id, amount) => {}} 
        deleteItem={(id) => {}} 
      />
    </div>
  );
};

export default Main;
