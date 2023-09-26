import React from "react";
import "./Card.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Card1({ food }) {
  const { price, image, name, id, disc } = food;
  const navigate = useNavigate();

  const handleEdited = () => {
    // Redirect to the update page and pass parameters
    navigate(`/update?name=${name}&price=${price}&id=${id}&image=${image}&disc=${disc}`);
  };

  return (
    <div className="cafe-item js-item">
      <div className="image__container">
        <img className="circular-image" src={image} alt={""} />
      </div>
      <h4 className="card__title">
        {name} <span className="card__price"> {price}</span>
      </h4>

      <div className="cafe-item-buttons">
        <Button title={"edit"} type={"edit"} onClick={handleEdited} />
      </div>
    </div>
  );
}

export default Card1;