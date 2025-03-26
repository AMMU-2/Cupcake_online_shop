

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addToCart } from "../redux/cartSlice"; 
import "../css/cupcakeDetails.css";
import Cart from "../components/cart";
import PopupModal from "../components/PopupModel";

const CupcakeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cupcake = useSelector((state) => state.cupcake.selectedCupcake);
  const userId = localStorage.getItem("userId");

  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  if (!cupcake) {
    return <p>No cupcake selected!</p>;
  }

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!userId) {
      setShowPopup(true);
      return;
    }

    const newItem = {
      id: cupcake._id,
      name: cupcake.cakeName,
      price: cupcake.price,
      quantity: quantity,
      image: cupcake.image,
    };

    dispatch(addToCart(newItem));
    alert(`${cupcake.cakeName} added to cart! 🎉`);
  };

  return (
    <Container className="cupcake-details">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="cupcake-card">
            <Row className="g-0">
             
              <Col md={4} className="image-container">
                <Card.Img
                  src={`http://localhost:5000/${cupcake.image}`}
                  alt={cupcake.cakeName}
                  className="cupcake-img"
                />
              </Col>

              
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

                    <Button className="back-button mt-2" onClick={() => navigate("/")}>
                      Back 🔙
                    </Button>
                  </div>

                  <a href="#" className="wishlist-link"> Add to my wish list</a>
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
