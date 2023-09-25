import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import Card1 from "../Components/Card/Card1";





function ShowProducts({telegramId}) {
  // this add new file 
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetchData(telegramId);
  }, [telegramId]);

  const fetchData = async (telegram_id) => {
    try {
      const response = await axios.get(`https://negari.marketing/api/product/my/${telegram_id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",

        },
      });

      if (response.status === 200) {
        const jsonData = response.data;
        console.log(jsonData);
        setData(jsonData);
      } else {
        console.error("Error: Invalid response status", response.status);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  const refreshInterval = 30 * 1000; // 30 seconds

  setInterval(fetchData, refreshInterval);

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
  }, []);

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems((prevCartItems) => prevCartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };



 


 

  return (
    <>
   
      <section className="cafe-page cafe-items " id="section-1">
        <br></br>
        {/* <Cart cartItems={cartItems} onCheckout={onCheckout} /> */}

        <div className="cafe-items" id="showpr">
          {data.map((food) => {
            return (
              <Card1 food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
            );

          })}
        </div>
      </section>
      
    </>
  );
}
export default ShowProducts;
