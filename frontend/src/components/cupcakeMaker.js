import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/cupcakeMaker.css";
 
const CupcakeMaker = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row" style={{marginLeft:"-30%"}}>
        <div className="col-md-10 offset-md-1 p-4 border rounded cupcake-box" >
          <h2 className="text-center fw-bold">
            Cupcakes Delivered Online with{" "}
            <span className="cupcake-highlight">The Cupcake Maker</span>
          </h2>
          <p className="text-center">
            Cupcakes make delightful treats for any special occasion. Online cupcake order is a boon for shoppers.
            At <span className="cupcake-highlight">The Cupcake Maker</span>, we offer a variety of designer cupcakes that are sure to impress.
          </p>
          <p>
            The soccer cupcake is just right for the sports fan. It works well to celebrate the victory of a soccer player.
            It will add the requisite sweetness to his joy.
          </p>
          <p>
            This cake is available in 6 pieces for online delivery and can be made in four flavors:
            <strong> Chocolate, Butterscotch, Pineapple, and Vanilla.</strong>
          </p>
          <p>
            The rose cupcake is a delight and adds an element of fun to any celebration, whether it's a
            <strong> Birthday, Anniversary, Christmas, or New Year.</strong> This comes in 8 pieces with the same delicious flavors.
          </p>
          <p>
            The special photo cupcake is a personalized treat that carries a unique touch—just send in a photograph,
            and we'll create a custom cupcake for your celebration.
          </p>
          <p>
            So go ahead and treat your loved ones. Cupcakes are a perfect indulgence for any occasion and are quite hard to resist.
            The fresh and spongy texture makes it the best gift for your loved ones.
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default CupcakeMaker;
 
 