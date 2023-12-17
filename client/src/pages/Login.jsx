import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  document.title = "Login | Little Lemon";

  const [login, setLogin] = useState({ mail: "", password: "", error: "" });

  function handleLogin(e) {
    e.preventDefault();
    axios.post("http://db4free.net:3306/login", login)
      .then((result) => {
        if (result.data.status === "success") {
          localStorage.setItem("user", JSON.stringify(login));
          window.location.href = "/";
        } else {
          setLogin({
            ...login,
            error: "Usuario no encontrado, intentalo de nuevo",
          });
        }
      });
  }

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
          <p>{login.error}</p>
          <form
            className="loginForm"
            action="#"
            method="post"
            onSubmit={handleLogin}
          >
            <label htmlFor="mail">Usuario</label>
            <input
              type="text"
              name="mail"
              id="mail"
              onChange={handleChange}
              value={login.mail}
            />
            <label htmlFor="pass">Contraseña</label>
            <input
              type="password"
              name="password"
              id="pass"
              onChange={handleChange}
              value={login.password}
            />
            <input type="submit" value="Enviar" className="submitButton" />
          </form>
          <p>
            Don't have an account? <Link to={"/register"}>Register here</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
