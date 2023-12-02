import React from "react";
import restauranfood from "../assets/icons_assets/restauranfood.jpg";
import greekSalad from "../assets/icons_assets/greek-salad.jpg";
import bruchetta from "../assets/icons_assets/bruchetta.svg";
import lemonDessert from "../assets/icons_assets/lemon-dessert.jpg";
import { useNavigate } from "react-router-dom";


function Main() {
  document.title = 'Home | Little Lemon'
    const navigate = useNavigate()
  return (
    <main>
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero__datos">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              We are a family owned restaurant, focused on traditional recipies
              served with a modern twist.
            </p>
            <button onClick={() => navigate("/reservations")}>Reserve a Table</button>
          </div>
          <img src={restauranfood} alt="Restaurant"/>
        </div>
      </section>
      <section className="highlights" id="highlights">
        <div className="container">
          <div className="title-container">
            <h1>This weeks specials!!</h1>
            <button onClick={() => navigate("/menu")}>Online Menu</button>
          </div>
          <div className="cards-container">
            <div className="card">
              <img
                className="card-image"
                src={greekSalad}
                alt="greek salad"
              ></img>
              <div className="card-data">
              <div className="card-title">
                <h3>Greek Salad</h3>
                <p className="card-price">$12.99</p>
              </div>
              <p>
                The famous greek salad of crispy lettuce, peppers, olives and
                our Chicago style feta cheese, garnished with crunchy garlic and
                rosemary croutons.
              </p>
              <button className="addToCart">Order a delivery</button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-image"
                src={bruchetta}
                alt="Bruchetta"
              ></img>
              <div className="card-data">
              <div className="card-title">
                <h3>Bruchetta</h3>
                <p className="card-price">$5.99</p>
              </div>
              <p>
                Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.
              </p>
              <button className="addToCart">Order a delivery</button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-image"
                src={lemonDessert}
                alt="Lemon Dessert"
              ></img>
              <div className="card-data">
              <div className="card-title">
                <h3>Lemon Dessert</h3>
                <p className="card-price">$5.00</p>
              </div>
              <p>
                This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.
              </p>
              <button className="addToCart">Order a delivery</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
