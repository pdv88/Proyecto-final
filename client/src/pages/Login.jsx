import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  // const url = "https://little-lemon-server.onrender.com"
  const url = "http://localhost:3000";

  document.title = "Login | Little Lemon";

  const [login, setLogin] = useState({ mail: "", password: "", error: "" });
  const [errors, setErrors] = useState({ mail: "", password: "" });

  function handleLogin(e) {
    e.preventDefault();
    let errorsTemp = {};
    if (login.mail === "") {
      errorsTemp.mail = "Please input your mail";
    }
    if (login.password === "") {
      errorsTemp.password = "Please input your password";
    }
    if (Object.keys(errorsTemp).length > 0) {
      setErrors(errorsTemp);
    } else {
      axios.post(url + "/login", login).then((result) => {
        switch (result.data.status) {
          case "success":
            localStorage.setItem("user", JSON.stringify(result.data));
            location.reload()
            window.location.href='/'
            break;
          case "failed user":
            setLogin({
              ...login,
              error: "Incorrect mail, please try again",
            });
          case "failed password":
            setLogin({
              ...login,
              error: "Incorrect password, please try again",
            });
            break;
          default:
            break;
        }
      });
    }
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
            <input type="submit" value="Enviar" className="submitButton" />
          </form>
          <p>
            Don't have an account? <br />
            <Link to={"/register"}>Register here</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
