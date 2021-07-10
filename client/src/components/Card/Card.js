import React from "react";
import "./Card.css";

const Card = ({ name, key }) => {
  return (
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-md-4">
          <div class="box">
            <div class="our-services settings">
              <div class="icon">
                {" "}
                <img src="https://i.imgur.com/6NKPrhO.png" />{" "}
              </div>
              <h4>{name}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
