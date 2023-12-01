import React from "react";
import logo from "../assets/icons_assets/Logo.svg";
import Nav from "./Nav";
import burger from "../assets/icons_assets/burger.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <header>
        <div className="container">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <img
            src={burger}
            alt="burger"
            onClick={toggleMenu}
            className="icons burger"
          />
          <Nav />
        </div>
      </header>
      {isActive && (
        <div className="burgerMenu" onClick={toggleMenu}>
          <Nav />
        </div>
      )}
    </>
  );
}

export default Header;
