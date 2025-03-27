import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import { clearCart, loadCartFromStorage } from "../redux/cartSlice";
import "../css/header.css";
import Cart from "./cart";

export default function Header() {
  const [showCart, setShowCart] = useState(false); // State to toggle cart visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieving authentication and cart details from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const totalCartQuantity = useSelector((state) => state.cart.cartUserCount);

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    dispatch(loadCartFromStorage());

    // Sync cart data if storage changes (e.g., another tab modifies it)
    const syncCart = () => dispatch(loadCartFromStorage());
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [dispatch]);

  // Handle user logout: clears authentication and cart, then navigates to home
  const handleLogOut = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <header className="sticky-header"> {/* Fixed header at the top */}
      <div className="headerLogo"> 
        <img src="images/headerImage.jpg" alt="The Cupcake Maker Logo" />
        The Cupcake Maker
      </div>

      <div className="nav-links"> {/* Navigation links including cart and authentication */}

        {/* Cart link with total item count; clicking opens the cart */}
        <Link onClick={() => setShowCart(true)}>Cart ({totalCartQuantity || 0})</Link>

        {/* Conditional rendering for login/logout options */}
        {isLoggedIn ? (
          <>
            <span className="userIdDisplay">Welcome, User ID: {userId}</span>
            <Link to="/" onClick={handleLogOut}>Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      {/* Cart component displayed when showCart is true */}
      <Cart show={showCart} handleClose={() => setShowCart(false)} userId={userId} />
    </header>
  );
}
