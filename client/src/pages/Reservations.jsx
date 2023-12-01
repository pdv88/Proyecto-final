import React from "react";
import BookingForm from "../components/BookingForm";
import { useNavigate } from "react-router-dom";

function Reservations() {
  document.title = 'Reservations | Little Lemon'

  const navigate = useNavigate();
  return (
    <>
      {localStorage.getItem("user") === null ? (
        <>
          <section className="reservations" id="reservations">
            <div className="container">
              <h1>Reservations</h1>
              <h3>
                You need to login to make or manage a reservation
              </h3>
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          </section>
        </>
      ) : (
        <section className="reservations" id="reservations">
          <div className="container">
            <h1>Reservations</h1>
            <BookingForm />
          </div>
        </section>
      )}
    </>
  );
}

export default Reservations;
