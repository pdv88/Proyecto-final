import React from "react";
// importacion de imagenes 
import aboutImg from '../assets/icons_assets/mario_adrian_a.jpg';
import aboutImg2 from '../assets/icons_assets/mario_and_adrianb.jpg'

function About() {
  // cambio de titulo del documento
  document.title = "About | Little Lemon";
  return (
    <>
      <section id="about">
        <div className="container">
          <h1>About Us</h1>
          <img src={aboutImg} alt="" />
          <p>
            Welcome to Mario and Adrian’s Traditional Italian Restaurant!
            Nestled in the heart of Chicago, we are a family-owned restaurant
            that brings the rich flavors and ambience of Italy right to your
            table.
          </p>
          <p>
            Our story began with two brothers, Mario and Adrian, who shared a
            deep love for their Italian heritage and a passion for culinary
            arts. Born and raised in Italy, they grew up in a home where the
            kitchen was the heart of the house, and meals were a time for
            family, love, and celebration.
          </p>
          <p>
            In 2023, they decided to bring their family’s traditional recipes
            and the warm Italian hospitality to Chicago. They wanted to create a
            place where people could enjoy authentic Italian cuisine, just like
            Nonna used to make, in a cozy and friendly environment.
          </p>
          <img src={aboutImg2} alt="" />
          <p>
            Our menu is a testament to the brothers’ roots, featuring a variety
            of traditional dishes from different regions of Italy. From the
            hearty lasagna of Emilia-Romagna to the delicate risottos of Veneto,
            each dish is prepared with the freshest ingredients and a lot of
            love.
          </p>
          <p>
            At Mario and Adrian’s, we believe that a meal is not just about
            food, but an experience to be shared and cherished. We invite you to
            join us for a meal, enjoy our hospitality, and become a part of our
            family.
          </p>
          <p>
            <strong>Buon appetito!</strong>
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
