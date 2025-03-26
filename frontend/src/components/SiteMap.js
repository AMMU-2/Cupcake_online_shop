import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import '../css/SiteMap.css';
 
const SiteMap = () => {

  const navigate = useNavigate();
 
  return (
<div className="container sitemap">
<h1 className="my-4">Site Map</h1>
<div className="sitemap-list">

      
<div className="sitemap-section">
<h3>Main Pages</h3>
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/new-products">New Products</Link></li>
<li><Link to="/specials">Specials</Link></li>
<li><Link to="/categories">Categories</Link></li>
<li><Link to="/my-account">My Account</Link></li>
<li><Link to="/blog">Blog</Link></li>
<li><Link to="/contacts">Contact Us</Link></li>
</ul>
</div>
 
       
<div className="sitemap-section">
<h3>Categories</h3>
<ul>
<li><Link to="/categories/gifts-combos">Gifts & Combos</Link></li>
<li><Link to="/categories/premium-cupcakes">Premium Cupcakes</Link></li>
<li><Link to="/categories/birthday-cupcakes">Birthday Cupcakes</Link></li>
<li><Link to="/categories/custom-cupcakes">Custom Cupcakes</Link></li>
<li><Link to="/categories/cartoon-cupcakes">Cartoon Cupcakes</Link></li>
<li><Link to="/categories/holiday-cupcakes">Holiday Cupcakes</Link></li>
<li><Link to="/categories/eggless-cupcakes">Eggless Cupcakes</Link></li>
</ul>
</div>
 
       
<div className="sitemap-section">
<h3>Account & Support</h3>
<ul>
<li><Link to="/login">Login</Link></li>
<li><Link to="/register">Create Account</Link></li>



</ul>
</div>
</div>
 
    

</div>

  );

};
 
export default SiteMap;

 