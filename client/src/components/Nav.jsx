import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Nav() {

  const url = "https://little-lemon-server.onrender.com"
  // const url = 'http://localhost:3000' 

  const user = JSON.parse(localStorage.getItem('user'))


  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))

  
  // const [cartCounter, setCartCounter] = useState(cart.length)

  // useEffect(() => {

  // }, [cart])

  // useEffect(() => {
  //   setCartCounter(cart.length)
  // },[cartCounter])

  // codigo que va en link de cart {cartCounter == 0 ? '' : cartCounter}



  return (
    <>
      <nav>
        <ul>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/menu'}>Menu</Link></li>
          <li><Link to={'/reservations'}>Reservations</Link></li>
          <li><Link to={'/cart'}>Cart </Link></li>
          <li>{localStorage.getItem('user')=== null ? (
            <Link to={'/login'}>Login</Link>
          ):(
            <Link to={'/logout'}>Hi {user.name}</Link>)}
            </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
