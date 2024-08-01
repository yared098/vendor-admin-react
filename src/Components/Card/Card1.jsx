import React from "react";
import "./Card.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Card1({ food }) {
  const { price, image, name ,id,disc} = food;
  const navigate = useNavigate();

  const handleEdited = () => {
    // Redirect to the update page and pass parameters
    navigate(`/update?name=${name}&price=${price}&id=${id}&image=${`https://negari.marketing/uploads/${image}`}&disc=${disc}`);
  };

  return (
    <div className="cafe-item js-item">
      <div className="image__container">
       
        <img src={`https://negari.marketing/uploads/${image}`} alt={""} />
      </div>
      <h4 className="card__title">
        {name}  <span className="card__price"> {price}</span>
      </h4>

      <div  style={{ borderRadius:'20px',  color:"white" ,backgroundColor:'green',textAlign:'center'}} className="cafe-item-buttons">
        <Button   style={{ borderRadius:'20px',backgroundColor:'green',textAlign:'center'}}title={"edit"} type={"edit"} onClick={handleEdited} />
      </div>
    </div>
  );
}

export default Card1;