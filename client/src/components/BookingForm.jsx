import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingForm() {

  // variables URL para facil cambio de local a servidor durante desarrollo
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

  // useEffect que se encarga de obtener las reservaciones del usuario cuando se carga el componente
  useEffect(() => {
    fetchReservations();
  }, []);

  // funcion para obtener las reservaciones de la base de datos usando el metodo post, enviando la id del usuario guardada en el localstorage.
  const fetchReservations = () => {
    const idUser = parseInt(JSON.parse(localStorage.getItem("user")).id_user);
    console.log(idUser);
    axios
      .post(url + "/userReservations", { idUser: idUser })
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      });
  };

  // funcion que maneja los cambios en los inputs y actualoza los valores de la variable form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // funcion que maneja el envio del formulario donde primero revisa si hay errores en los valores introducidos, 
  // si hay valores incorrector se regresan los errores. si los valores son correctos se hace la peticion al servidor 
  // y si recibe respuesta positiva con la informacion de la reservacion entonces se actualiza el valor de la 
  // variable reservations y se muestra en la seccion de reservaciones
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
      errorsTemp.date = "Reservations must be made 1 day in advance";
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
          fetchReservations();
          localStorage.setItem("reservations", JSON.stringify(reservations));
          setErrors({});
          setForm({
            ...form,
            name: "",
            email: "",
            date: "",
            hour: "",
            guests: "",
            occasion: "",
          });
        } else if (response.data.status === "Reservation already exist") {
          alert("Reservation already exist");
        } else {
          alert("Reservation failed, try again");
        }
      });
    }
  }

  // funcion que hace la peticion al servidor de eliminar la reservacion de la id seleccionada.
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

  // funcion que muestra las reservaciones del usuario desplegando la informacion en forma de cards.
  function showReservations() {
    if (reservations.length === undefined) {
      return;
    } else {
      return reservations.map((reservation) => {
        const date = new Date(reservation.date);
        return (
          <div key={reservation.id_reservation} className="reservation-card">
            <h2>Reservation {reservation.id_reservation}</h2>
            <h3>User ID: {reservation.id_user}</h3>
            <h3>
              Date: {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </h3>
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
        );
      });
    }
  }

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
