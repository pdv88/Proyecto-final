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
              <div>
                <img src={logo} alt="Logo" />
              </div>
          <div className="footer_socialsLinks">
              <div>
                <h3>Links</h3>
                <p>Terms</p>
                <p>Privacy</p>
                <p>Compliances</p>
              </div>
            <div>
              <h3>Socials</h3>
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
              <h3>Contact Us</h3>
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
