// ==============================Configuracion============================

const express = require("express");
const cors = require("cors");
// se Eligio SQL para la base de datos para relacionar tablas de reservaciones con usuarios
const mysql = require("mysql");
const bodyParser = require("body-parser");
// se usa brcyptjs en vez de bcrypt porque causa problemas en render.com
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

// variables de entorno guardadas en el archivo .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// =============================Peticiones==================================

// -----Peticion para login--------
// peticion asincrona donde se busca el correo introducido, de no existir se regresa 
// un status de usuario incorrecto. si el correo existe entonces se compara la 
// contraseña introducida con la contraseña encriptada y de ser correcta se regresa
//  una respuesta positiva
app.post("/login", async (req, res) => {
  const { mail, password } = req.body;
  db.query("SELECT * FROM users WHERE mail=?", [mail], async (err, result) => {
    if (err) {
      console.error("Error fetching user by mail: " + err);
    }
    if(result.length===0){
      res.json({ status: "userFail" });
    } else {
      const hashedPassword = await bcrypt.compare(password, result[0].password);
      if (hashedPassword) {
        const { password, ...user } = result[0];
        res.json({ ...user, status: "success" });
      } else {
        res.json({ status: "passwordFail" });
      }
    } 
  });
});

// ------Peticion para registro------
// se hace una peticion con el metodo post donde primero se verifica si el 
// correo ingresado existe en la base de datos, de no existir se avanza con 
// el ingreso de los datos en la base de datos y regresa toda la informacion 
// del usuario encriptando la contraseña primero.

app.post("/register", async (req, res) => {
  console.log();
  const { name, lastname, mail, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query("SELECT mail FROM users WHERE mail=?", [mail], (err, result) => {
    if (result.length == 0) {
      db.query(
        "INSERT INTO users (name,lastname,password,mail,phone) VALUES (?,?,?,?,?)",
        [name, lastname, hashedPassword, mail, phone],
        (err, response) => {
          if (err) {
            console.error("Error en la insercion: " + err);
          }
          res.json({ status: "success" });
        }
      );
    } else {
      res.json({ status: "email ya en uso" });
    }
  });
});

// ------Eliminacion de cuenta de usuario------
// se hace una peticion con el metodo delete donde se elimna la cuenta 
// del usuario buscando la id del usuario

app.delete("/deleteAccount", (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  db.query("DELETE FROM users WHERE id_user=?", [userId], (err, result) => {
    if (err) {
      console.error("Error deleting account: " + err);
    }
    if (result.affectedRows > 0) {
      res.json({ status: "Account deleted" });
    }
  });
});

// ------Peticion actualizacion datos de usuario------
// Hace la actualizacion de los datos usando el metodo put y este regresa 
// la informacion del usuario actualizada para hacer el archivo de local storage

app.put("/updateUserInfo", (req, res) => {
  const { name, lastname, phone } = req.body.updatedUser;
  const userId = req.body.userId;
  db.query(
    "UPDATE users SET name=?, lastname=?, phone=? WHERE id_user=?",
    [name, lastname, phone, userId],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar usuario: " + err);
      }
      if (result.affectedRows > 0) {
        db.query(
          "SELECT id_user,name,lastname,phone,mail FROM users WHERE id_user=?",
          [userId],
          (err, result) => {
            if (err) {
              console.error("Error fetching user data: " + err);
            }
            if (result.length > 0) {
              res.status(200).json(result);
            }
          }
        );
      }
    }
  );
});

// ------Peticiones de menu------
// peticiones usando el metodo post que leen los platillos de la base de 
// datos para mostrar en la pagina de menu

app.post("/menu/breakfast", (req, res) => {
  db.query('SELECT * FROM dishes WHERE type="breakfast"', (err, result) => {
    if (err) {
      console.error("Error fetching data: " + err);
    }
    res.json(result);
  });
});

app.post("/menu/lunch", (req, res) => {
  db.query('SELECT * FROM dishes WHERE type="lunch"', (err, result) => {
    if (err) {
      console.error("Error fetching data: " + err);
    }
    res.json(result);
  });
});

app.post("/menu/dinner", (req, res) => {
  db.query('SELECT * FROM dishes WHERE type="dinner"', (err, result) => {
    if (err) {
      console.error("Error fetching data: " + err);
    }
    res.json(result);
  });
});

// ------Peticiones de reservaciones------

// peticion para crear una reservacion donde primero se verifica si el usuario 
// ya tiene una reservacion hecha para esa fecha y hora, de no haber una 
// reservacion existente se prosigue al registro de la reservacion 
app.post("/reservations", (req, res) => {
  const { userId, name, email, date, hour, guests, occasion } = req.body;
  db.query(
    "SELECT * FROM reservations WHERE id_user=? AND date=? AND time=?",
    [userId, date, hour],
    (err, result) => {
      if (err) {
        console.error("Error checking if reservation already exist " + err);
      }
      if (result.length > 0) {
        res.json({ status: "Reservation already exist" });
      } else {
        db.query(
          "INSERT INTO reservations (id_user,name,email,date,time,guests,occasion) VALUES(?,?,?,?,?,?,?)",
          [userId, name, email, date, hour, guests, occasion],
          (err, result) => {
            if (err) {
              console.error("Error inserting reservation: " + err);
              res.json({ status: "failed" });
            } else {
              res.json({ status: "success" });
            }
          }
        );
      }
    }
  );
});

// peticion para leer todas las reservaciones hechas por el usuario para 
// mostrarlas en la pagina de reservacoines
app.post("/userReservations", (req, res) => {
  const userId = req.body.idUser;
  db.query(
    "SELECT * FROM reservations WHERE id_user=?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error fetching user reservations: " + err);
      }
      if (result.length === 0) {
        res.json({ status: "no hay reservaciones" });
      } else {
        res.json(result);
      }
    }
  );
});

// peticion para eliminar reservaciones usando la id de la reservacion y el metodo delete
app.delete("/deleteReservation", (req, res) => {
  const reservationId = req.body.id;
  console.log(reservationId);
  db.query(
    "DELETE FROM reservations WHERE id_reservation=?",
    [reservationId],
    (err, result) => {
      if (err) {
        console.error("Error deleting reservation " + err);
      }
      if (result.affectedRows > 0) {
        res.json({ status: "delete succesful" });
      }
    }
  );
});

// =================================Conexion=================================

try {
  db.connect();
  console.log("Conexion exitosa a base de datos");
} catch (error) {
  console.error("Error al conectar a base de datos: " + error);
}

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Servidor levantado");
});
