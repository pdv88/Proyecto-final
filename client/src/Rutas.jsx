// importacion de paginas a usar en el browserrouter
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import About from './pages/About';
import Reservations from './pages/Reservations';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout'
import Register from './pages/Register';


import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function Rutas(){
    return(
        <>
        
        <Router>
            <Header/>
                <Routes>
                    {/* declaracion de rutas de las paginas */}
                    <Route path='/' element={<Main/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/menu' element={<Menu/>}/>
                    <Route path='/reservations' element={<Reservations/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            <Footer/>
        </Router>
        </>
    )
}

export default Rutas