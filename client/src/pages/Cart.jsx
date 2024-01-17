import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  // const url = "https://little-lemon-server.onrender.com"
  const url = "http://localhost:3000"

  document.title = "Cart | Little Lemon";

  const [cart, setCart] = useState([]);
  let totalCart = 0;

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  function deleteProduct(index) {
    let newCart = [];
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      if (i !== index) {
        newCart.push(cart[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function buyCart() {
    axios.post(url + "/order", cart).then((response) => {
      console.log("peticion enviada");
    });
    // setCart([]);
  }

  return (
    <>
      <section id="cart">
        <div className="container">
          <h1>Cart</h1>
          <div className="cartCardContainer">
            <ul className="cartList">
              {cart.map((product, index) => {
                totalCart += product.price;
                return (
                  <li className="cartItemCard" key={index}>
                    <img src={product.src} alt="product" />
                    <div className="cartItemCard_data">
                      <p>{product.dish}</p>
                      <span>€{product.price.toFixed(2)}</span>
                    </div>
                    <button
                      type="button"
                      className="secondaryButton removeItemCart"
                      onClick={() => deleteProduct(index)}
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
            {cart.length !== 0 ? (
              <div className="cartTotal">
                <p>Subtotal €{(totalCart * 0.85).toFixed(2)}</p>
                <p>+15% taxes €{totalCart.toFixed(2)}</p>
                <p>Delivery {totalCart > 20 ? "Free" : "€2"}</p>
                <h2>
                  Your total is €
                  {totalCart > 20
                    ? totalCart.toFixed(2)
                    : (totalCart + 2).toFixed(2)}
                </h2>
                {localStorage.getItem("user") ? (
                  <button className="checkoutBtn" onClick={buyCart}>
                    Checkout
                  </button>
                ) : (
                  <button className="checkoutBtn">
                    <Link to="/login">Login to checkout</Link>
                  </button>
                )}
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
