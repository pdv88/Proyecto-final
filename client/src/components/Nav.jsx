import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  
  
  const user = JSON.parse(localStorage.getItem('user')) 
  
  // const [cartCounter, setCartCounter] = useState(JSON.parse(localStorage.getItem('cart')).length)  
  // const updateCartCounter = () => {
  //   setCartCounter(JSON.parse(localStorage.getItem('cart')).length);
  // };
  
  // useEffect(() => {
  //   window.addEventListener('storage', updateCartCounter)
  //   return () => {
  //     window.removeEventListener('storage', updateCartCounter);
  //   }
  // }, []);
  
  // {cartCounter == 0 ? '' : cartCounter}

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
            <Link to={'/logout'}>Hi {user.name}</Link>
            )}
            </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
