import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/cupcakeDetails.css";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
 
const CupcakeDetails = () => {
  const cupcake = useSelector((state) => state.cupcake.selectedCupcake);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartShow, setCartShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const userId = localStorage.getItem("userId");
 
  if (!cupcake) {
    return <p>No cupcake selected!</p>;
  }
 
  //   Ensure quantity is always a number and within valid range
  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value, 10);
   
    if (isNaN(value) || value < 1) {
      value = 1;  // Minimum quantity is 1
    } else if (value > 10) {
      value = 10; // Maximum quantity is 10
    }
 
    setQuantity(value);
  };
 
  const handleAddToCart = async () => {
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
          quantity: Number(quantity),  //  Ensure quantity is a number
        }),
      });
 
      const responseData = await response.json();
 
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add to cart");
      }
 
      console.log("Cart Updated:", responseData);
      setCartItems(responseData.cartItems);
      setCartShow(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };
 
  return (
    <Container className="cupcake-details">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="cupcake-card">
            <Row className="g-0">
              {/* Left side - Image */}
              <Col md={4} className="image-container">
                <Card.Img
                  src={`http://localhost:5000/${cupcake.image}`}
                  alt={cupcake.name}
                  className="cupcake-img"
                />
              </Col>
 
              {/* Right side - Details */}
              <Col md={8}>
                <Card.Body>
                  <Card.Title className="cupcake-title">{cupcake.cakeName}</Card.Title>
                  <Card.Text>{cupcake.description}</Card.Text>
                  <h3 className="text-danger">Rs. {cupcake.price}</h3>
                 
                  <label>Quantity: </label>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    max="10"
                    onChange={handleQuantityChange}
                    className="form-control w-50 d-inline"
                  />
                 
                  <div className="button-group">
                    <Button onClick={handleAddToCart} className="add-to-cart-btn mt-2">
                      Add to Cart
                    </Button>
                   
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
                      deleteItem={(id) => {}}
                    />
 
                    <Button className="back-button mt-2" onClick={() => navigate("/")}>
                      Back
                    </Button>
                  </div>
                 
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
 
export default CupcakeDetails;
