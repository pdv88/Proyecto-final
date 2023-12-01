import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  document.title = 'Logout | Little Lemon'
  const navigate = useNavigate();
  function closeSesion() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <>
      <section id="logout">
        <div className="container">
          <h1> Want to logout?</h1>
          <div className="buttonContainer">
            <button onClick={() => navigate("/")}>Stay</button>
            <button onClick={closeSesion} className="secondaryButton">Logout</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Logout;
