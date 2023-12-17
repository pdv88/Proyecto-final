import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingForm() {
  
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
      const savedReservations = JSON.parse(localStorage.getItem('reservations'))
      if (savedReservations) {
        setReservations(savedReservations)
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('reservations', JSON.stringify(reservations))
    }, [reservations]);

  const [form, setForm] = useState({
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
      axios.post('https://littlelemon-tkmu.onrender.com/reservations', form).then(response => {
        if (response.data.status === 'success') {
          alert('Reservation Created succesfully')
          setReservations((prevReservations) => [...prevReservations, form]);
          localStorage.setItem('reservations', JSON.stringify(reservations))
          setErrors({});
          setForm({
            name: "",
            email: "",
            date: "",
            hour: "",
            guests: "",
            occasion: "",
          });
        } else {
          alert('Reservation failed, try again')
        }
      })
    }
  }

  function deleteReservation(e, index) {
    const auxReservations = reservations.filter(
      (reservation, i) => i !== index
    );
    setReservations(auxReservations);
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
          {errors.name && <p className="formError">{errors.name}</p>}
          <label htmlFor="em">Email</label>
          <input
            type="email"
            name="email"
            id="em"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="formError">{errors.email}</p>}
          <label htmlFor="res-date">Choose date</label>
          <input
            type="date"
            id="res-date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <p className="formError">{errors.date}</p>}
          <label htmlFor="hour">Choose time</label>
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
          {errors.hour && <p className="formError">{errors.hour}</p>}
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
          {errors.guests && <p className="formError">{errors.guests}</p>}
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
          {errors.occasion && <p className="formError">{errors.occasion}</p>}
          <input
            className="submitButton"
            type="submit"
            value="Make Your reservation"
          />
        </form>
        <div className="prevReservations">
          {reservations.map((reservation, index) => {
              return (
                <>
                  <div key={index} className="reservation-card">
                    <h2>Reservation {parseInt(index) + 1}</h2>
                    <h3>{reservation.date}</h3>
                    <h3>{reservation.hour}</h3>
                    <p>
                      Name: <strong>{reservation.name}</strong>
                    </p>
                    <p>
                      Guests: <strong>{reservation.guests}</strong>
                    </p>
                    <p>
                      Occasion: <strong>{reservation.occasion}</strong>
                    </p>
                    <button onClick={(e) => deleteReservation(e, index)}>
                      Cancel reservation
                    </button>
                  </div>
                </>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default BookingForm;
