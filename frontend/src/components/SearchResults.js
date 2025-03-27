import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Cupcake from "./cupcake"; 
import { selectCupcake } from "../redux/cupcakeSlice";
import { addToCart } from "../redux/cartSlice"; 
import "../css/cupcakeHome.css";
import Cart from "./cart";
import PopupModal from "../components/PopupModel";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  // State management for cupcakes, loading state, errors, and modals
  const [cupcakes, setCupcakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery || searchQuery.trim() === "") {
        setLoading(false);
        setError("Please enter a search query.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/cake/search?query=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();

        console.log("Fetched data:", data);

        if (response.ok) {
          setCupcakes(Array.isArray(data.data) ? data.data : []);
          setError("");
        } else {
          setCupcakes([]);
          setError(data.message || "No cupcakes found.");
        }
      } catch (err) {
        setError("Failed to fetch cupcakes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Handle 'View' button click - Redirects to cupcake details page
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake)); 
    navigate("/cupcake-details");
  };

  // Handle 'Add to Cart' button click
  const handleAddToCart = async (cupcake) => {
    if (!userId) {
      setShowPopup(true); // Show login popup if the user is not logged in
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
      setCartShow(true); // Show the cart modal

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="main">
      <h2>Search Results for "<span>{searchQuery}</span>"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cupcakes.length === 0 ? (
        <p>No cupcakes found</p>
      ) : (
        <div className="cupcake-list">
          {cupcakes.map((cupcake) => (
            <Cupcake
              key={cupcake._id}
              image={cupcake.image}
              cakeName={cupcake.cakeName}
              description={cupcake.description}
              price={cupcake.price}
              onView={() => handleView(cupcake)}
              onAddToCart={() => handleAddToCart(cupcake)}
            />
          ))}
        </div>
      )}

      {/* Login Popup Modal - Shown when a user is not logged in */}
      <PopupModal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onLogin={() => navigate("/login")}
      />

      {/* Cart Modal - Displays cart items */}
      <Cart
        show={cartShow}
        handleClose={() => setCartShow(false)}
        userId={userId}
      />
    </div>
  );
};

export default SearchResults;
