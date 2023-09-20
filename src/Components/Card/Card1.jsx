import React, { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";

function Card1({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const {  price ,image,name } = food;


  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };
  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };

  return (
    <div className="cafe-item js-item">
      <span
        className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
      <div className="image__container">
        <img src={image} alt={""} />
      </div>
      <h4 className="card__title">
        {name} . <span className="card__price">$ {price}</span>
      </h4>

      <div className="cafe-item-buttons">
        <Button title= {count===0?" add ":"+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Card1;
