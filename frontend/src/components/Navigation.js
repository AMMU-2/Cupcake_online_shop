import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/navigation.css";

export default function Navigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get login status from Redux
  const [searchTerm, setSearchTerm] = useState(""); // Store search input value
  const navigate = useNavigate();

  // Handle search submission and navigate to search results page
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`); 
    }
  };

  return (
    <nav>
      <ul>
        {/* Navigation Links */}
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/new-products">NEW PRODUCTS</Link></li>
        <li><Link to="/specials">SPECIALS</Link></li>
        {isLoggedIn && <li><Link to="/my-account">MY ACCOUNT</Link></li>} {/* Show only if logged in */}
        <li><Link to="/site-map">SITEMAP</Link></li>
        <li><Link to="/contacts">CONTACTS</Link></li>
        <li><Link to="/blog">BLOG</Link></li>

        {/* Search Box */}
        <li className="searchBox1">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>

        {/* Responsive Menu Icon */}
        <li className="icon">
          <a href="#">
            <i className="material-icons w3-large">menu</i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
