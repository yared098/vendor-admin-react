import React from "react";
// import "./Cart.css";
import"../../App.css"
// import Button from "../Button/Button";
const tele = window.Telegram.WebApp;

tele.MainButton.text = "pay now";
tele.MainButton.show();

function Cart({ cartItems, onCheckout }) {
  //const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <div className="cart__container">
      
      {/* {cartItems.length === 0 ? "No items in cart" : ""} */}
      {/* <br /> <span className="">Total Price: ${totalPrice.toFixed(2)}</span> */}
      {/* <Button
        title={`${cartItems.length === 0 ? "Order !" : "Checkout"} `}
        type={"checkout"}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}
      /> */}
    </div>
  );
}

export default Cart;
