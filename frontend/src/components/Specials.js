import React, { useEffect, useState } from "react";
import Cupcake from "../components/cupcake";
import "../css/cupcakeHome.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";

const BirthdayCupcake = () => {
  const [cupcakes, setCupcakes] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch("http://localhost:5000/cake/category/Specials"); // Ensure correct endpoint
        const data = await response.json();

        if (response.ok) {
          setCupcakes(data);
        } else {
          console.error("Failed to fetch cupcakes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cakes:", error);
      }
    };

    fetchCupcakes();
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
          userId,
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
      <h2>Specials</h2>
      <div className="cupcake-list">
        {cupcakes.length > 0 ? (
          cupcakes.map((cupcake) => (
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
          <p>No Specials available.</p>
        )}
      </div>

      {/* Popup for login if user is not authenticated */}
      <PopupModal show={showPopup} onClose={() => setShowPopup(false)} onLogin={() => navigate("/login")} />

      {/* Cart Component */}
      <Cart show={cartShow} handleClose={() => setCartShow(false)} userId={userId} />
    </div>
  );
};

export default BirthdayCupcake;
