import React, { useEffect, useState } from 'react';
import '../css/cupcakeHome.css';
 
const Cupcake = ({ image, cakeName, description, price, onView, onAddToCart  }) => {
  
  return (
  <div className="cupcakeDiv col-3 col-t-6 col-m-6">
    <img src={`http://localhost:5000/${image}`} alt={cakeName} />
    <h6><b>{cakeName}</b></h6>
    <div className="cupcakeText">
      <p>{description}</p>
    </div>
    <h6><b>Rs. {price}</b></h6>
    <button className="link" onClick={onView}>View</button> {/* ✅ Updated */}
    <button className="link" onClick={onAddToCart}>Add to cart</button>
  </div>
  );
};
 
export default Cupcake;