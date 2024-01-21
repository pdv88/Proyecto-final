import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Logout() {

  // variables URL para facil cambio de local a servidor durante desarrollo
  const url = "https://little-lemon-server.onrender.com"
  // const url = 'http://localhost:3000'

  // cambio de titulo del documento
  document.title = 'Logout | Little Lemon'

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  // variable para mostrar el modad de eliminacion de cuenta de usuario
  const [deleteModal, setDeleteModal] = useState(false)
  // variable deinformacion de usuario
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    lastname: user.lastname,
    phone:user.phone,
  });

  // funcion para cerrar sesion borrando los archivos user y reservations del localstorage
  function closeSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("reservations");
    window.location.href = "/";
  }

  // funcion de manejo de cambios en los inputs 
  function handleChange(e) {
    setUpdatedUser({...updatedUser, [e.target.name]:e.target.value})
  }

  const [errors, setErrors] = useState({})
  
  // funcion de validacion de inputs que regresa los errores encontrados
  function validate(values){
    let errors = {}
    if (!values.name) {
      errors.name = 'Name is required'
    }
    if (!values.lastname) {
      errors.lastname = 'Lastname is required'
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required'
    } else if (values.phone.length > 10 || values.phone.length < 8){
      errors.phone = 'Invalid phone number'
    }
    return errors
  }
  
  // funcion para actualizar la informacion del usuario donde se verifica primero si hay errores en los input, luego se hace la peticion con el metodo put mandando la informacion del usuario y su ID
  function handleUpdate(e){
    e.preventDefault()
    const errors = validate(updatedUser)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      const userId = parseInt(JSON.parse(localStorage.getItem('user')).id_user)
      axios.put(url+'/updateUserInfo', {updatedUser, userId}).then(response => {
        if (response.status === 200) {
          alert("User Updated successfully")
          localStorage.setItem('user', JSON.stringify(response.data[0]))
          window.location.href = '/logout'
        } 
      }).catch(error => {
        console.error("Error updating user: ", error);
        alert("Failed to update user");
      });
    }
  }
  // funcion para abrir y cerrar el modal de eliminacion de cuenta
  function showDeleteModal(){
    setDeleteModal(!deleteModal)
  }

  // funcion para borrar la cuenta de usuario usando el metodo delete y mandando la ID del usuario
  function handleAccountDelete(){
    const userId = user.id_user
      axios.delete(url+'/deleteAccount', {data: {userId:userId}}).then(response =>{
        if (response.data.status === 'Account deleted') {
          alert('Account deleted succesfully')
          localStorage.removeItem('user')
          window.location.href='/'
        }
      }).catch(err =>{
        console.error('Error deleting user account')
      })
  }

  return (
    <>
      <section id="logout">
        <div className="container">
        <h1>Logout?</h1>
          <div className="buttonContainer">
            <button onClick={() => navigate("/")}>No, go to homepage</button>
            <button onClick={closeSesion} className="secondaryButton">Yes, logout</button>
          </div>
        </div>
        <div className="container">
          <h1>Account</h1>
          <h2>Update your Info</h2>
          <form action="" method="post"  onSubmit={handleUpdate}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={updatedUser.name} onChange={handleChange}/>
            <label htmlFor="lastname">Lastname:</label>
            <input type="text" name="lastname" id="lastname" value={updatedUser.lastname} onChange={handleChange} />
            <label htmlFor="phone">Phone:</label>
            <input type="number" name="phone" id="phone" value={updatedUser.phone} onChange={handleChange}/>
            <input className="submitBtn" type="submit" value={'Update'}/>
          </form>
        </div>
        <button className="secondaryButton" onClick={showDeleteModal}>Delete Account</button>
        {deleteModal &&
          <div className="modalDeleteAccount container">
            <h2>Are you sure? This action cannot be undone</h2>
            <button onClick={handleAccountDelete}>Yes, delete my account</button>
            <button className="secondaryButton" onClick={showDeleteModal}>Cancel</button>
          </div>
        }
      </section>
    </>
  );
}

export default Logout;
