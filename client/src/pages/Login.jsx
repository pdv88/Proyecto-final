import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  // variables URL para facil cambio de local a servidor durante desarrollo
  const url = "https://little-lemon-server.onrender.com"
  // const url = "http://localhost:3000";

  document.title = "Login | Little Lemon";

  const [login, setLogin] = useState({ mail: "", password: "", error: "" });
  const [errors, setErrors] = useState({ mail: "", password: "" });

  function handleLogin(e) {
    e.preventDefault();
    // se reinician los valores de los errores
    setErrors({ mail: "", password: "" });
    setLogin({ ...login, error: "" });
    let errorsTemp = {};
    // validacion de email no vacio
    if (login.mail === "") {
      errorsTemp.mail = "Please input your mail";
    }
    // validacion de Contraseña no vacia
    if (login.password === "") {
      errorsTemp.password = "Please input your password";
    }
    // condicional si existen errores
    if (Object.keys(errorsTemp).length > 0) {
      setErrors(errorsTemp);
    } else {
      // si no existen errores se procede a hacer la peticion
      axios.post(url + "/login", login).then((result) => {
        switch (result.data.status) {
          // respuesta positiva hace un archivo user en localstorage para guardar la info del usuario
          case "success":
            localStorage.setItem("user", JSON.stringify(result.data));
            window.location.href = "/";
            break;
            // en caso de error de contraseña se muestra contraseña incorrecta
          case "passwordFail":
            setLogin({
              ...login,
              error: "Incorrect password, please try again",
            });
            break;
            // en caso de no encontrar el mail se muestra mail incorrecto
          case "userFail":
            setLogin({
              ...login,
              error: "Incorrect mail, please try again",
            });
          default:
            break;
        }
      });
    }
  }
  // funcion de manejo de cambio en el imput para actualizar valores de login
  function handleChange(e) {
    let name = e.target.name;
    let valor = e.target.value;
    setLogin({ ...login, [name]: valor });
  }

  return (
    <>
      <section id="login">
        <div className="container">
          <h1>Login</h1>
          <p className="error">{login.error}</p>
          <form
            className="loginForm"
            action="#"
            method="post"
            onSubmit={handleLogin}
          >
            <label htmlFor="mail">Email</label>
            <input
              type="text"
              name="mail"
              id="mail"
              onChange={handleChange}
              value={login.mail}
            />
            {errors.mail && <p className="error">{errors.mail}</p>}
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="password"
              id="pass"
              onChange={handleChange}
              value={login.password}
            />
            {errors.mail && <p className="error">{errors.password}</p>}
            <input type="submit" value="Login" className="submitButton" />
          </form>
          <p className="registerLink">
            Don't have an account? <br />
            <Link to={"/register"}>Register here</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
