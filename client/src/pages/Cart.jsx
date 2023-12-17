import React, { useState, useEffect } from "react";
import { json } from "react-router-dom";

function Cart() {
    document.title = 'Cart | Little Lemon'

    const [cart,setCart] = useState([]);
    let totalCart = 0

    useEffect(() => {
        let cart = localStorage.getItem("cart");
        if (cart) {
            setCart(JSON.parse(cart));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("cart",JSON.stringify(cart));
    },[cart])

    function deleteProduct(index){
        let newCart = [];
        let cart = JSON.parse(localStorage.getItem("cart"));
        for(let i = 0; i < cart.length; i++){
            if (i !== index) {
                newCart.push(cart[i]);
            }
        }
        setCart(newCart);
    }

    function buyCart() {
        setCart([]);
    }

    return(
        <>
        <section id="cart">
            <div className="container">
                <h1>Cart</h1>
                <div className="cartCardContainer">
                {cart.map((product, index) => {
                    totalCart += product.price
                    return (
                    <li className="cartItemCard" key={index}>
                        <img src={product.src} alt="product"/>
                        <div className="cartItemCard_data">
                        <p>{product.dish}</p>
                        <span>€{product.price.toFixed(2)}</span>
                        </div>
                        <button type="button" className="secondaryButton removeItemCart" onClick={() => deleteProduct(index)}>X</button>
                    </li>
                )
                })}
                </div>
                {cart.length !== 0 ? (
                <div className="cartTotal">
                    <h2>Your total is €{totalCart.toFixed(2)}</h2>
                    <button onClick={buyCart}>Checkout</button>
                </div>
                ) : (
                <p>Your cart is empty</p>
                )}
            </div>
        </section>
        </>
    )
}

export default Cart