import React from "react";
import "./Card.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Card1({ product }) {
  const { price, image, name ,id,disc} = product;
  const navigate = useNavigate();

  const handleEdited = () => {
    // Redirect to the update page and pass parameters
    navigate(`/update?name=${name}&price=${price}&id=${id}&image=${`https://negari.marketing/uploads/${image}`}&disc=${disc}`);
  };

  return (
    <div className="cafe-item js-item">
      <div className="image__container" style={{ borderRadius:"10px"}} >
        <img src={`https://negari.marketing/uploads/${image}`} alt={""} />
      </div>
      <h4 className="card__title">
        {name}  
      </h4>
      <h4 className="card__title">
        Price <span className="card__price"> {price} ETB</span>
      </h4>

      <div  style={{ borderRadius:'10px',  color:"white" ,backgroundColor:'yellow',   justifyContent:'center',textAlign:'center'}} className="cafe-item-buttons">
        <Button   style={{ borderRadius:'2px',backgroundColor: 'var(--tg-theme-button-color)',textAlign:'center'}}title={"edit"} type={"edit"} onClick={handleEdited} />
      </div>
    </div>
  );
}

export default Card1;