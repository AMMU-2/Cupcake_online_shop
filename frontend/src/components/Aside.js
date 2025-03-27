import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navigation.css'; // Importing the CSS file for styling

const Aside = () => {
  return (
    <aside className="aside col-3 col-t-4 col-m-12"> {/* Sidebar container with responsive classes */}
      
      {/* Category Section */}
      <div className="aside1">
        <h3>CATEGORIES</h3>
        <ul>
          {/* List of categories with navigation links */}
          <li><Link to="/categories/gifts-combos">Gifts/Combos</Link></li>
          <li><Link to="/categories/premium-cupcakes">Premium Cupcakes</Link></li>
          <li><Link to="/categories/birthday-cupcakes">Birthday Cupcakes</Link></li>
          <li><Link to="/categories/custom-cupcakes">Custom Cupcakes</Link></li>
          <li><Link to="/categories/cartoon-cupcakes">Cartoon Cupcakes</Link></li>
          <li><Link to="/categories/superhero-cupcakes">Superhero Cupcakes</Link></li>
          <li><Link to="/categories/cheesecake-cupcakes">Cheesecake Cupcakes</Link></li>
          <li><Link to="/categories/holiday-cupcakes">Holiday Cupcakes</Link></li>
          <li><Link to="/categories/eggless-cupcakes">Eggless Cupcakes</Link></li>
          <li><Link to="/categories/midnight-delivery">Midnight Delivery</Link></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="aside2">
        <h3>CONTACT US</h3>
        <p>
          Our support is available 24/7.<br/>
          +91-9988776655 / +91-9988776654 {/* Contact details for support */}
        </p>
      </div>
    </aside>
  );
};

export default Aside; // Exporting the Aside component
