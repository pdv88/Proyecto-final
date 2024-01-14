// ==============================Configuracion============================

const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

// =============================Peticiones==================================

// -----Peticion para login--------

app.post('/login',(req,res) => {
    const {mail, password} = req.body
    db.query('SELECT id_user,name,lastname,mail,phone FROM users WHERE mail=? AND password=?',[mail,password], (err,result) => {
        if (result.length > 0) {
            res.json({...result, status:'success'})
            console.log(result)
        } else {
            res.json({status:'failed'})
        }
    })
})

// ------peticion de informacion de usuario------

app.post('/user', (req,res) => {
    const userMail = req.body.mail
    db.query("SELECT id_user,name,lastname,phone FROM users WHERE mail=?",[userMail], (err,result) => {
        if (err) {
            console.error('Error fetching user data: '+err)
        } else {
            res.json(result)
        }
    })
})

// ------Peticion para registro------

app.post('/register', (req,res) => {
    console.log()
    const {name, lastname, mail, phone, password} = req.body
    db.query('SELECT mail FROM users WHERE mail=?',[mail], (err,result) => {
        if(result.length == 0){
            db.query('INSERT INTO users (name,lastname,password,mail,phone) VALUES (?,?,?,?,?)', 
            [name,lastname,password,mail,phone], 
            (err,response) => {
                if (err) {
                    console.error('Error en la insercion: '+err)
                }
                res.json({status:'success'})
            })
        } else {
            res.json({status:'email ya en uso'})
        }
    })
})

// ------Eliminacion de cuenta de usuario------

app.delete('/deleteAccount', (req,res) => {
    const {userId} = req.body
    console.log(userId)
    db.query('DELETE FROM users WHERE id_user=?',[userId], (err,result) =>{
        if (err) {
            console.error('Error deleting account: '+err)
        }
        if (result.affectedRows > 0) {
            res.json({status:'Account deleted'})
        }
    })
})

// ------Peticion actualizacion datos de usuario------

app.put('/updateUserInfo', (req,res) => {
    const {name, lastname, phone} = req.body.updatedUser
    const userId = req.body.userId
    db.query('UPDATE users SET name=?, lastname=?, phone=? WHERE id_user=?',[name, lastname, phone, userId], (err,result)=>{
        if (err) {
            console.error('Error al actualizar usuario: '+err)
        }
        if (result.affectedRows > 0) {
            db.query("SELECT id_user,name,lastname,phone,mail FROM users WHERE id_user=?",[userId], (err,result) => {
                if (err) {
                    console.error('Error fetching user data: '+err)
                }
                if (result.length > 0) {
                    res.status(200).json(result)
                }
            })
        }
    })
})

// ------Peticiones de menu------

app.post('/menu/breakfast', (req,res) => {
    db.query('SELECT * FROM dishes WHERE type="breakfast"', (err,result) => {
        if (err) {
            console.error('Error fetching data: '+ err)
        }
        res.json(result)
    })
})

app.post('/menu/lunch', (req,res) => {
    db.query('SELECT * FROM dishes WHERE type="lunch"', (err,result) => {
        if (err) {
            console.error('Error fetching data: '+ err)
        }
        res.json(result)
    })
})

app.post('/menu/dinner', (req,res) => {
    db.query('SELECT * FROM dishes WHERE type="dinner"', (err,result) => {
        if (err) {
            console.error('Error fetching data: '+ err)
        }
        res.json(result)
    })
})

// ------Peticiones de reservaciones------

app.post('/reservations', (req,res) => {
    const {userId,name,email,date,hour,guests,occasion} = req.body
    db.query('SELECT * FROM reservations WHERE id_user=? AND date=? AND time=?',[userId,date,hour], (err,result) =>{
        if (err) {
            console.error('Error checking if reservation already exist '+err)
        }
        if (result.length > 0) {
            res.json({status:'Reservation already exist'})
        } else {
            db.query('INSERT INTO reservations (id_user,name,email,date,time,guests,occasion) VALUES(?,?,?,?,?,?,?)',
            [userId,name,email,date,hour,guests,occasion], 
            (err,result) =>{
                if (err) {
                    console.error('Error inserting reservation: '+err)
                    res.json({status:'failed'})
                } else {
                    res.json({status:'success'})
                }
            })
        }
    })

})

app.post('/userReservations', (req,res) => {
    const userId = req.body.idUser
    db.query('SELECT * FROM reservations WHERE id_user=?',[userId],(err,result)=>{
        if (err) {
            console.error('Error fetching user reservations: '+err)
        }
        if (result.length === 0) {
            res.json({status:'no hay reservaciones'})
        } else {
            res.json(result)
        }
    })
})

app.delete('/deleteReservation', (req,res) => {
    const reservationId = req.body.id
    console.log(reservationId)
    db.query('DELETE FROM reservations WHERE id_reservation=?',[reservationId], (err,result) => {
        if (err) {
            console.error('Error deleting reservation '+err)
        }
        if (result.affectedRows > 0) {
            res.json({status:'delete succesful'})
        }
    })
})

// ------Peticiones Ordenes------

// app.post('/order', (req,res) => {
//     console.log(req.body)
//     db.query('INSERT INTO orders ')
//     for (let i = 0; cart < cary.length; i++) {
//         db.query(insert cart[i])
        
//     }
// })


// =================================Conexion=================================

try{
    db.connect()
    console.log('Conexion exitosa a base de datos')
} catch(error) {
    console.error('Error al conectar a base de datos: '+error)
}

app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log('Servidor levantado')
})