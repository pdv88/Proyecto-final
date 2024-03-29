import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Register() {
  
  // variables URL para facil cambio de local a servidor durante desarrollo
  const url = "https://little-lemon-server.onrender.com"
  // const url = 'http://localhost:3000'

  // cambio de titulo del documento
  document.title = 'Register | Little Lemon'

  // usestate para almacenar y actualizar los valores del registro
  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    mail: "",
    phone:0
  });

  // funcion para el manejo de cambios y actualizacion de los valores del registro
  function handleChange(e) {
    setRegister({...register, [e.target.name]:e.target.value})
  }
  
  const [errors, setErrors] = useState({})
  
  // funcion para la validacion de los valores ingresados que devuelve los errores 
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
  
  // funcion de manejo de registro que valida si existen errores primero, de no existir errores se hace la peticion de registro con metodo post. Se valida en servidor si el correo introducido ya esta en uso.
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
          {errors.name && <p className="error">{errors.name}</p> }

          <label htmlFor="lastname">Lastname: </label>
          <input type="text" name="lastname" id="lastname" onChange={handleChange} value={register.lastname} />
          {errors.lastname && <p className="error">{errors.lastname}</p> }

          <label htmlFor="phone">Phone: </label>
          <input type="number" name="phone" id="phone" onChange={handleChange} value={register.phone} />
          {errors.phone && <p className="error">{errors.phone}</p> }

          <label htmlFor="mail">Email:</label>
          <input type="text" name="mail" id="mail" onChange={handleChange} value={register.mail} />
          {errors.mail && <p className="error">{errors.mail}</p> }

          <label htmlFor="pass">Password: </label>
          <input type="password" name="password" id="pass2" onChange={handleChange} value={register.password} />
          {errors.password && <p className="error">{errors.password}</p> }

          <label htmlFor="pass">Confirm password: </label>
          <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} value={register.confirmPassword} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p> }

          <button type="submit">Submit</button>
        </form>
        </div>
      </section>
    </>
  );
}

export default Register;
