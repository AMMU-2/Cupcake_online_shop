import React, { useEffect, useState } from 'react';
import Cupcake from '../components/cupcake';
import '../css/cupcakeHome.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel"
 
const SuperheroCupcakes = () => {
  const [cupcakes, setCupcakes] = useState([]); // Stores the list of superhero-themed cupcakes
  const [cartShow, setCartShow] = useState(false); // Controls the visibility of the cart modal
  const [cartItems, setCartItems] = useState([]); // Stores items in the cart
  const [showPopup, setShowPopup] = useState(false); // Controls the visibility of the login popup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Retrieves the logged-in user ID from local storage

  // Fetch superhero-themed cupcakes from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/Superhero Cupcakes')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);

 // Handles the navigation to the cupcake details page
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake));
    navigate("/cupcake-details");
  };
 
 // Handles adding a cupcake to the cart
  const handleAddToCart = async (cupcake) => {
    if (!userId) {
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // Associates cart item with logged-in user
          cakeId: cupcake._id,
          name: cupcake.cakeName,
          price: cupcake.price,
          quantity: 1, // Default quantity when adding to cart
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add to cart");
      }

      console.log("Cart Updated:", responseData);
      setCartItems(responseData.cartItems); // Updates cart items state
      setCartShow(true); // Shows cart modal

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="main">
      <h2>Superhero Cupcakes</h2>
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
              onView={() => handleView(cupcake)} // Handles cupcake detail view
              onAddToCart={() => handleAddToCart(cupcake)} // Handles add to cart action
            />
          ))
        ) : (
          <p>No superhero cupcakes available.</p>
        )}
      </div>

      {/* Login popup modal, shown if user is not logged in */}
      <PopupModal
            show={showPopup}
            onClose={() => setShowPopup(false)}
            onLogin={() => navigate("/login")}
       />

      {/* Cart modal component, shown when item is added to cart */}
      <Cart 
        show={cartShow} 
        handleClose={() => setCartShow(false)} 
        userId={localStorage.getItem("userId")}  
        updateQuantity={(id, amount) => {}} // Placeholder for quantity update function
        deleteItem={(id) => {}} // Placeholder for item removal function
      />
    </div>
  );
};
 
export default SuperheroCupcakes;
