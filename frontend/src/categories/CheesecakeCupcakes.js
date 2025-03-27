import React, { useEffect, useState } from 'react'; // Importing necessary React
import Cupcake from '../components/cupcake';// Importing the Cupcake component
import '../css/global.css';
import { useDispatch } from "react-redux";//Importing useDispatch hook from Redux
import { useNavigate } from "react-router-dom";
import { selectCupcake } from "../redux/cupcakeSlice";// Importing Redux action to select a cupcake
import Cart from "../components/cart";// Importing the Cart component
import PopupModal from "../components/PopupModel"
 
const CheesecakeCupcakes = () => {
  const [cupcakes, setCupcakes] = useState([]);// State to store cupcakes data
  const [cartShow, setCartShow] = useState(false);// State to control cart visibility
  const [cartItems, setCartItems] = useState([]); // State to store items in the cart
  const [showPopup, setShowPopup] = useState(false);// State to control popup visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();// Initializing 

  const userId = localStorage.getItem("userId");
 
  useEffect(() => {
    fetch('http://localhost:5000/cake/category/Cheesecake Cupcakes')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCupcakes(data);// Setting fetched data to cupcakes state
      })
      .catch((error) => console.error('Error fetching cakes:', error));
  }, []);
 
  const handleView = (cupcake) => {
    dispatch(selectCupcake(cupcake));
    navigate("/cupcake-details");
  };

  const handleAddToCart = async (cupcake) => {
    if (!userId) {
      setShowPopup(true);
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
        throw new Error(responseData.message || "Failed to add to cart");// Handling errors
      }

      console.log("Cart Updated:", responseData);
      setCartItems(responseData.cartItems);// Updating cart items state
      setCartShow(true);

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };
 
  return (
    <div className="main">
      <h2>Cheesecake Cupcakes</h2>
      <div className="cupcake-list">
        {cupcakes.length > 0 ? (
          // Rendering list of cupcakes
          cupcakes.map(cupcake => (
            <Cupcake
              key={cupcake._id}
              image={cupcake.image}
              cakeName={cupcake.cakeName}
              description={cupcake.description}
              price={cupcake.price}
              categoryName={cupcake.categoryName}
              onView={() => handleView(cupcake)}
              onAddToCart={() => handleAddToCart(cupcake)} // Handling add to cart action
            />
          ))
        ) : (
          <p>No cheesecake cupcakes available.</p>// Showing message if no cupcakes are available
        )}
      </div>
      <PopupModal
            show={showPopup}
            onClose={() => setShowPopup(false)}
            onLogin={() => navigate("/login")}
          />
      <Cart 
        show={cartShow} 
        handleClose={() => setCartShow(false)} 
        userId={localStorage.getItem("userId")}  
        updateQuantity={(id, amount) => {}}
        deleteItem={(id) => {}}// Placeholder for delete item function
        
      />
    </div>
  );
};
 
export default CheesecakeCupcakes;
