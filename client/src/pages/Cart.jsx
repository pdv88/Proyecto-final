import React, { useState, useEffect } from "react";
import { json } from "react-router-dom";

function Cart() {
    document.title = 'Cart | Little Lemon'

    const [cart,setCart] = useState([]);

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
                {cart.map((product, index) => {
                    return (
                    <li key={index}>
                        <img src={product.src} alt="product" width={100} height={100} />
                        <p>{product.dish}</p>
                        <span>€{product.price}</span>
                        <button type="button" className="secondaryButton" onClick={() => deleteProduct(index)}>Remove</button>
                    </li>
                )
                })}
                {cart.length !== 0 ? (<button onClick={buyCart}>Buy now</button>) : (<p>Your cart is empty</p>)}
            </div>
        </section>
        </>
    )
}

export default Cart