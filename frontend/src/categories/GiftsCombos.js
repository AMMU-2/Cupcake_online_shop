import React, { useEffect, useState } from 'react';
import Cupcake from '../components/cupcake';
import '../css/global.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";

const GiftsCombos = () => {
  // State variables for managing cupcakes, cart visibility, cart items, and login popup
  const [cupcakes, setCupcakes] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // Fetch cupcakes from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/Gifts Combos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);

  // Handles viewing a cupcake's details
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
      <h2>Gifts Combos</h2>
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
          <p>No gifts combos available.</p>
        )}
      </div>
      
      {/* Login popup modal */}
      <PopupModal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onLogin={() => navigate("/login")}
      />
      
      {/* Shopping cart component */}
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

export default GiftsCombos;
