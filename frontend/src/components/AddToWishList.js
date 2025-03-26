import React from 'react';

const AddToWishList = ({ product }) => {
  const handleAddToWishList = () => {
    
    console.log(`${product.name} added to wishlist`);
  };

  return (
    <button onClick={handleAddToWishList}>Add to Wishlist</button>
  );
};

export default AddToWishList;