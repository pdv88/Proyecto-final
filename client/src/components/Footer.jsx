// importacion de iconos de redes sociales y react
import React from "react";
import facebook from '../assets/icons_assets/facebook.svg'
import foursquare from "../assets/icons_assets/foursquare.svg";
import twitter from "../assets/icons_assets/x.svg";
import pinterest from '../assets/icons_assets/pinterest.svg'
import instagram from '../assets/icons_assets/instagram.svg'
import logo from "../assets/icons_assets/Logo.svg";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
              <div className="footerLogo">
                <img src={logo} alt="Logo" />
              </div>
          <div className="footer_socialsLinks">
              <div>
                <h2>Links</h2>
                <p>Terms</p>
                <p>Privacy</p>
                <p>Compliances</p>
              </div>
            <div>
              <h2>Socials</h2>
              <img src={facebook} alt="facebook" className="icons"/>
              <img src={instagram} alt="instagram" className="icons"/>

              <img
                src={foursquare}
                alt="Facebook"
                className="icons"
              />
              <img src={twitter} alt="Twitter" className="icons" />
              <img src={pinterest} alt="Pinterest" className="icons"/>
            </div>
            <div>
              <h2>Contact Us</h2>
              <p>Tel: 54-76-87-09</p>
              <p>info@littlelemon.com</p>
            </div>
          </div>
        <p><strong>&copy; All rights reserved Little Lemon 2023</strong></p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
