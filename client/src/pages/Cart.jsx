import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  // variables URL para facil cambio de local a servidor durante desarrollo
  const url = "https://little-lemon-server.onrender.com"
  // const url = "http://localhost:3000"
  
  // cambio de titulo del documento
  document.title = "Cart | Little Lemon";

  const [cart, setCart] = useState([]);
  let totalCart = 0;

  // useEffect para obtener carritos pasados
  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  // funcion que hace quita del carrito el item seleccionado y actualiza los valores del carrito y del localstorage
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

  // funcion que concluye la orden, se completara en un futuro pero por ahora muestra un mensaje de confirmacion y reinicia los valores del carrito
  function buyCart() {
    alert("Order recieved!!")
    setCart([]);
    localStorage.removeItem('cart')
  }

  return (
    <>
      <section id="cart">
        <div className="container">
          <h1>Cart</h1>
          <div className="cartCardContainer">
            <ul className="cartList">
              {/* toma los valores del carrito y los muestra en forma de cards */}
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
            {/* si existen items en el carrito muestra un div con el subtotal, impuestos, envio y total del carrito. de no haber items en el carrito solo muestra que el carrito esta vacio */}
            {cart.length !== 0 ? (
              <div className="cartTotal">
                <p>Subtotal €{(totalCart * 0.85).toFixed(2)}</p>
                <p>+15% taxes €{totalCart.toFixed(2)}</p>
                <p>Delivery {totalCart > 20 ? "Free" : "€2"}</p>
                <h2>
                  Your total is €
                  {/* si el total es mayor a 20 el envio es gratis, de lo contrario se cobrara $2 de envio */}
                  {totalCart > 20
                    ? totalCart.toFixed(2)
                    : (totalCart + 2).toFixed(2)}
                </h2>
                {/* Si el usuario inicio sesion te muestra el boton de checkout, de lo cnotrario te muestra un boton para hacer login */}
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
