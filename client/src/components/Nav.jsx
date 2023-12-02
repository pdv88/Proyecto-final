import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))

  
  const [cartCounter, setCartCounter] = useState(cart.length)

  useEffect(() => {

  }, [cart])

  useEffect(() => {
    setCartCounter(cart.length)
  },[cartCounter])

  return (
    <>
      <nav>
        <ul>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/menu'}>Menu</Link></li>
          <li><Link to={'/reservations'}>Reservations</Link></li>
          <li><Link to={'/cart'}>Cart {cartCounter == 0 ? '' : cartCounter}</Link></li>
          <li>{localStorage.getItem('user')=== null ? (
            <Link to={'/login'}>Login</Link>
          ):(
            <Link to={'/logout'}>Hi {JSON.parse(localStorage.getItem('user')).nombre}</Link>)}
            </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
