import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Register() {
  
  const url = "https://little-lemon-server.onrender.com"
  // const url = 'localhost:3000'

  document.title = 'Register | Little Lemon'

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const status = queryParams.get("status");


  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    mail: "",
    phone:0
  });

  function handleChange(e) {
    setRegister({...register, [e.target.name]:e.target.value})
  }
  
  const [errors, setErrors] = useState({})
  
  function validate(values){
    let errors = {}
    if (!values.name) {
      errors.name = 'Name is required'
    }
    if (!values.lastname) {
      errors.lastname = 'Lastname is required'
    }
    if (!values.mail) {
      errors.mail = 'Email is required'
    } else if(!/\S+@\S+\.\S+/.test(values.mail)){
      errors.mail = 'Email is invalid'
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required'
    } else if (values.phone.length > 10 || values.phone.length < 8){
      errors.phone = 'Invalid phone number'
    }
    
    if (!values.password) {
      errors.password = 'Please choose a password'
    } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)){
      errors.password = 'Minimum eight characters, at least one letter and one number'
    }
    
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm password'
    } else if(values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match"
    }
    return errors
  }
  

  function handleRegister(e){
    e.preventDefault()
    const errors = validate(register)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      axios.post(url+'/register', register).then(result => {
        if (result.data.status === 'success') {
          alert("Account register successful")
          window.history.back()
        } else if(result.data.status = 'email ya en uso') {
          setErrors(...errors, errors.mail = 'email ya en uso' )
        }
      })

    }
  }

  return (
    <>
      <section id="register">
        <div className="container">
        <h1>Register</h1>
        <form
          action="#"
          method="post"
          onSubmit={handleRegister}
        >
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name2" onChange={handleChange} value={register.name} />
          {errors.name && <p>{errors.name}</p> }

          <label htmlFor="lastname">Lastname: </label>
          <input type="text" name="lastname" id="lastname" onChange={handleChange} value={register.lastname} />
          {errors.lastname && <p>{errors.lastname}</p> }

          <label htmlFor="phone">Phone: </label>
          <input type="number" name="phone" id="phone" onChange={handleChange} value={register.phone} />
          {errors.phone && <p>{errors.phone}</p> }

          <label htmlFor="mail">Email:</label>
          <input type="text" name="mail" id="mail" onChange={handleChange} value={register.mail} />
          {errors.mail && <p>{errors.mail}</p> }

          <label htmlFor="pass">Password: </label>
          <input type="password" name="password" id="pass2" onChange={handleChange} value={register.password} />
          {errors.password && <p>{errors.password}</p> }

          <label htmlFor="pass">Confirm password: </label>
          <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} value={register.confirmPassword} />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p> }

          <button type="submit">Submit</button>
        </form>
        </div>
      </section>
    </>
  );
}

export default Register;
