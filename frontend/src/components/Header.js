
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import { clearCart, loadCartFromStorage } from "../redux/cartSlice";
import "../css/header.css";
import Cart from "./cart";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const totalCartQuantity = useSelector((state) => state.cart.cartUserCount);

 
  useEffect(() => {
    dispatch(loadCartFromStorage());

    const syncCart = () => dispatch(loadCartFromStorage());
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [dispatch]);


  const handleLogOut = () => {
    dispatch(logout());  
    dispatch(clearCart());  
    navigate("/");
  };

  return (
    <header className="sticky-header">
      <div className="headerLogo">
        <img src="images/headerImage.jpg" alt="The Cupcake Maker Logo" />
        The Cupcake Maker
      </div>

      <div className="nav-links">
        

        
        <Link onClick={() => setShowCart(true)}>Cart ({totalCartQuantity || 0})</Link>

        {isLoggedIn ? (
          <>
            <span className="userIdDisplay">Welcome, User ID: {userId}</span>
            <Link to="/" onClick={handleLogOut}>Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      
      <Cart show={showCart} handleClose={() => setShowCart(false)} userId={userId} />
    </header>
  );
}
