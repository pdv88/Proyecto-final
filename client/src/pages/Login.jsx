import React from "react";

function Login() {
  document.title = 'Login | Little Lemon'

  function checkUser(e) {
    e.preventDefault();
    let user = document.getElementById("nom").value;
    let pass = document.getElementById("pass").value;
    if (
      (user === "user" && pass === "1234") ||
      (user === "javi" && pass === "profejavi") ||
      (user === "pablo" && pass === "passMuySegura123")
    ) {
      alert("Logeado correctamente");
      localStorage.setItem(
        "user",
        JSON.stringify({ nombre: user, password: pass })
      );
      window.location.href = "/";
    } else {
      alert("user or password are incorrect");
    }
  }

  return (
    <>
      <section id="login">
        <div className="container">
          <h1>Login</h1>
          <form
            className="loginForm"
            action=""
            method="get"
            onSubmit={checkUser}
          >
            <label htmlFor="nom">Usuario</label>
            <input type="text" name="nombre" id="nom" />
            <label htmlFor="pass">Contraseña</label>
            <input type="password" name="password" id="pass" />
            <input type="submit" value="Enviar" className="submitButton" />
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
