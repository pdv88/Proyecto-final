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
    database: 'little_lemon_db'
})

// =============================Peticiones==================================

// -----Peticion para login--------

app.post('/login',(req,res) => {
    const {mail, password} = req.body
    db.query('SELECT * FROM users WHERE mail=? AND password=?',[mail,password], (err,result) => {
        if (result.length > 0) {
            res.json({status:'success'})
        } else {
            res.json({status:'failed'})
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
    const {name,email,date,hour,guests,occasion} = req.body
    db.query('INSERT INTO reservations (name,email,date,time,guests,occasion) VALUES(?,?,?,?,?,?)',
    [name,email,date,hour,guests,occasion], 
    (err,result) =>{
        if (err) {
            console.error('Error inserting reservation: '+err)
            res.json({status:'failed'})
        } else{
            res.json({status:'success'})
        }
    })
})




// =================================Conexion=================================

try{
    db.connect()
    console.log('Conexion exitosa a base de datos')
} catch(error) {
    console.error('Error al conectar a base de datos: '+error)
}

app.listen(process.env.PORT,() => {
    console.log('Servidor levantado')
})