import React, { useEffect, useState } from 'react';
import Cupcake from '../components/cupcake';
import '../css/cupcakeHome.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel"
 
const HolidayCupcakes = () => {
 // State variables for managing cupcakes, cart visibility, cart items, and login popup
  const [cupcakes, setCupcakes] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
 
  // Fetch holiday cupcakes from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/Holiday Cupcakes') 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);
 
  // Handles viewing cupcake details and navigates to the details page
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake));
    navigate("/cupcake-details");
  };

  // Handles adding cupcakes to the cart and checks user authentication
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
      setCartItems(responseData.cartItems);
      setCartShow(true);

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="main">
      <h2>Holiday Cupcakes</h2>
      <div className="cupcake-list">
        {/* Render list of cupcakes if available, else show message */}
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
          <p>No holiday cupcakes available.</p>
        )}
      </div>
      
      {/* Popup modal for login prompt if user is not logged in */}
      <PopupModal
            show={showPopup}
            onClose={() => setShowPopup(false)}
            onLogin={() => navigate("/login")}
          />
      
      {/* Cart component for showing cart items */}
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
 
export default HolidayCupcakes;
