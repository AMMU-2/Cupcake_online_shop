import React from 'react';

const AddToCart = ({ product }) => {
  const handleAddToCart = () => {
    
    console.log(`${product.name} added to cart`);
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  );
};

export default AddToCart;