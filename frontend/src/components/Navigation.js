
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/navigation.css";

export default function Navigation() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`); 
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/new-products">NEW PRODUCTS</Link></li>
        <li><Link to="/specials">SPECIALS</Link></li>
        {isLoggedIn && <li><Link to="/my-account">MY ACCOUNT</Link></li>}
        <li><Link to="/site-map">SITEMAP</Link></li>
        <li><Link to="/contacts">CONTACTS</Link></li>
        <li><Link to="/blog">BLOG</Link></li>

        
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

       
        <li className="icon">
          <a href="#">
            <i className="material-icons w3-large">menu</i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
