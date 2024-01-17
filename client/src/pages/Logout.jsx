import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Logout() {

  const url = "https://little-lemon-server.onrender.com"
  // const url = 'http://localhost:3000'

  document.title = 'Logout | Little Lemon'

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const [deleteModal, setDeleteModal] = useState(false)

  function closeSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("reservations");
    window.location.href = "/";
  }

  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    lastname: user.lastname,
    phone:user.phone,
  });

  function handleChange(e) {
    setUpdatedUser({...updatedUser, [e.target.name]:e.target.value})
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
    if (!values.phone) {
      errors.phone = 'Phone number is required'
    } else if (values.phone.length > 10 || values.phone.length < 8){
      errors.phone = 'Invalid phone number'
    }
    return errors
  }
  

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

  function showDeleteModal(){
    setDeleteModal(!deleteModal)
  }

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
            <input type="text" name="name" value={updatedUser.name} onChange={handleChange}/>
            <label htmlFor="lastname">Lastname:</label>
            <input type="text" name="lastname" value={updatedUser.lastname} onChange={handleChange} />
            <label htmlFor="phone">Phone:</label>
            <input type="number" name="phone" value={updatedUser.phone} onChange={handleChange}/>
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
