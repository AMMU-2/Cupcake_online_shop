import React, { useEffect, useState } from 'react';// Importing necessary React hooks and components
import Cupcake from '../components/cupcake';
import '../css/cupcakeHome.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";//Importing useNavigate hook from React Router
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";
 
const BirthdayCupcake = () => {
  const [cupcakes, setCupcakes] = useState([]);// State to store cupcakes data
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
 
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/Birthday Cupcakes') 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);
      })
      .catch((error) => console.error('Error fetching cakes:', error));// Handling errors
  }, []);
 
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake));
    navigate("/cupcake-details");
  };
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
      setCartItems(responseData.cartItems);// Updating cart items state
      setCartShow(true);

    } catch (error) {
      console.error("Error adding to cart:", error);// Handling errors
      alert(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="main">
      <h2>Birthday Cupcake</h2>
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
          <p>No birthday cupcakes available.</p>
        )}
      </div>
      <PopupModal
            show={showPopup}
            onClose={() => setShowPopup(false)}
            onLogin={() => navigate("/login")}
          />
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
 
export default BirthdayCupcake;
