import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingForm() {

  const url = "https://little-lemon-server.onrender.com"
  // const url = "http://localhost:3000"

  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    userId: parseInt(JSON.parse(localStorage.getItem("user")).id_user),
    name: "",
    email: "",
    date: "",
    hour: "",
    guests: "",
    occasion: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
    hour: "",
    guests: "",
    occasion: "",
  });

  useEffect(() => {
    fetchReservations()
  },[]);

  const fetchReservations = () => {
    const idUser = parseInt(JSON.parse(localStorage.getItem("user")).id_user);
    console.log(idUser);
    axios
      .post(url + "/userReservations", { idUser: idUser })
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    let errorsTemp = {};
    if (form.name === "") {
      errorsTemp.name = "Name is required";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errorsTemp.email = "Invalid email";
    }
    if (form.date === "") {
      errorsTemp.date = "Date is required";
    } else if (new Date(form.date) < new Date()) {
      errorsTemp.date = "Reservations must be made 1 day in advance"
    }
    if (form.hour === "") {
      errorsTemp.hour = "Time is required";
    }
    if (form.guests === "") {
      errorsTemp.guests = "Number of guests is required";
    }
    if (form.occasion === "") {
      errorsTemp.occasion = "Select the occasion";
    }
    if (Object.keys(errorsTemp).length > 0) {
      setErrors(errorsTemp);
    } else {
      axios.post(url + "/reservations", form).then((response) => {
        if (response.data.status === "success") {
          alert("Reservation Created succesfully");
          console.log("resevations made " + reservations);
          fetchReservations()
          localStorage.setItem("reservations", JSON.stringify(reservations));
          setErrors({});
          console.log("reservation " + form.userId);
          setForm({
            ...form,
            name: "",
            email: "",
            date: "",
            hour: "",
            guests: "",
            occasion: ""
          });
        } else if(response.data.status === 'Reservation already exist') {
          alert("Reservation already exist")
        } else {
          alert("Reservation failed, try again");
        }
      });
    }
  }

  function deleteReservation(id) {
    axios
      .delete(url + "/deleteReservation", { data: { id } })
      .then((response) => {
        if (response.data.status === "delete succesful") {
          const auxReservations = reservations.filter(
            (reservation) => reservation.id_reservation !== id
          );
          setReservations(auxReservations);
        }
      });
  }

  function showReservations() {
    if (reservations.length === undefined) {
      return 
    } else {
      return reservations.map((reservation) => {
        const date = new Date(reservation.date)
        return (
          <>
            <div key={reservation.id_reservation} className="reservation-card">
              <h2>Reservation {reservation.id_reservation}</h2>
              <h3>User ID: {reservation.id_user}</h3>
              <h3>Date: {date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}</h3>
              <h3>Time: {reservation.time}</h3>
              <p>
                Name: <strong>{reservation.name}</strong>
              </p>
              <p>
                Guests: <strong>{reservation.guests}</strong>
              </p>
              <p>
                Occasion: <strong>{reservation.occasion}</strong>
              </p>
              <button
                onClick={() =>
                  deleteReservation(parseInt(reservation.id_reservation))
                }
              >
                Cancel reservation
              </button>
            </div>
          </>
        );
      });
    }
  };

  return (
    <>
      <div className="form-reservations-container">
        <form className="bookingForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label htmlFor="em">Email</label>
          <input
            type="email"
            name="email"
            id="em"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <label htmlFor="res-date">Date</label>
          <input
            type="date"
            id="res-date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <p className="error">{errors.date}</p>}
          <label htmlFor="hour">Time</label>
          <select
            id="hour"
            value={form.hour}
            onChange={handleChange}
            name="hour"
          >
            <option disabled hidden value="">
              What time?
            </option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
            <option>22:00</option>
          </select>
          {errors.hour && <p className="error">{errors.hour}</p>}
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
          />
          {errors.guests && <p className="error">{errors.guests}</p>}
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={form.occasion}
            name="occasion"
            onChange={handleChange}
          >
            <option disabled hidden value="">
              Choose here
            </option>
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
          {errors.occasion && <p className="error">{errors.occasion}</p>}
          <input
            className="submitButton"
            type="submit"
            value="Make Your reservation"
          />
        </form>
        <div className="prevReservations">{showReservations()}</div>
      </div>
    </>
  );
}

export default BookingForm;
