import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/menu'}>Menu</Link></li>
          <li><Link to={'/reservations'}>Reservations</Link></li>
          <li><Link to={'/order'}>Order Online</Link></li>
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
