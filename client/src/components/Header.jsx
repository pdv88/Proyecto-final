import React from "react";
import logo from "../assets/icons_assets/Logo.svg";
import Nav from "./Nav";
import burger from "../assets/icons_assets/burger.svg";
import close from "../assets/icons_assets/xmark.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  // variable para saber si el menu hamburguesa esta abierto
  const [isActive, setIsActive] = useState(false);

  // funcion para abrir y cerrar el menu hamburguesa
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
          // si el menu esta abierto muestra el icono de cerrar, si esta cerrado muestra el icono de barras
            src={isActive ? close : burger}
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
