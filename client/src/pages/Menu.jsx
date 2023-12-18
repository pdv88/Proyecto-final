import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  document.title = "Menu | Little Lemon";

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  const url = "https://little-lemon-server.onrender.com"
  // const url = 'localhost:3000'

  useEffect(() => {
    axios.post(url+"/menu/breakfast").then((response) => {
      setBreakfast(response.data);
    });
    axios.post(url+"/menu/lunch").then((response) => {
      setLunch(response.data);
    });
    axios.post(url+"/menu/dinner").then((response) => {
      setDinner(response.data);
    });
  }, []);


  function menuMaker(dishes) {
    if (!dishes) {
      return null
    }
    return dishes.map((dish) => {
      return (
        <div className="dishCard" key={dish.id_dish}>
          <img src={dish.src} alt={dish.dish} />
          <div className="dishCard_datos">
            <h3>{dish.dish}</h3>
            <p>{dish.description}</p>
            <h3 className="price">€{dish.price.toFixed(2)}</h3>
            <button className="addToCart" onClick={() => addToCart(dish)}>
              Add to cart
            </button>
          </div>
        </div>
      );
    });
  }


  function addToCart(product) {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      let emptyArray = [];
      emptyArray.push(product);
      localStorage.setItem("cart", JSON.stringify(emptyArray));
    } else {
      let cartArray = JSON.parse(cart || "[]");
      cartArray.push(product);
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
  }

  return (
    <>
      <section id="menu">
        <div className="container">
          <h1>Menu</h1>
          <h2>Breakfast</h2>
          <div className="cards_container">{menuMaker(breakfast)}</div>
          <h2>Lunch</h2>
          <div className="cards_container">{menuMaker(lunch)}</div>
          <h2>Dinner</h2>
          <div className="cards_container">{menuMaker(dinner)}</div>
        </div>
      </section>
    </>
  );
}

export default Menu;
