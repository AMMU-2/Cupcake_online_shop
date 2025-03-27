import React, { useEffect, useState } from 'react';
import Cupcake from '../components/cupcake';
import '../css/cupcakeHome.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";

const BirthdayCupcake = () => {
  const [cupcakes, setCupcakes] = useState([]); // Store fetched cupcakes
  const [cartShow, setCartShow] = useState(false); // Control cart visibility
  const [cartItems, setCartItems] = useState([]); // Store items added to the cart
  const [showPopup, setShowPopup] = useState(false); // Show login popup when adding to cart without login
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Retrieve logged-in user ID

  // Fetch cupcakes belonging to "New Products" category on component mount
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/New Products') 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);

  // Handle "View" button click - Navigate to cupcake details page
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake)); // Store selected cupcake in Redux
    navigate("/cupcake-details"); // Navigate to details page
  };

  // Handle "Add to Cart" functionality
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
      setCartShow(true); // Show cart after adding item

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="main">
      <h2>New Products</h2>
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
          <p>No New Products available.</p> // Show message if no cupcakes are found
        )}
      </div>

      {/* Popup modal for login prompt when adding to cart */}
      <PopupModal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onLogin={() => navigate("/login")}
      />

      {/* Cart component to display added items */}
      <Cart 
        show={cartShow} 
        handleClose={() => setCartShow(false)} 
        userId={localStorage.getItem("userId")} 
        updateQuantity={(id, amount) => {}} // Placeholder function for updating quantity
        deleteItem={(id) => {}} // Placeholder function for deleting item
      />
    </div>
  );
};

export default BirthdayCupcake;
