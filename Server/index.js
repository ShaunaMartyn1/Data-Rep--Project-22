const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
mongoose.set('strictQuery', false);//might fix error

const app = express()
//use express.json() to get data into json format
app.use(express.json())

//add port - .env file
const PORT = process.env.PORT || 3001

//use cors
app.use(cors())

//Import Routes
const FilmListRoute = require('./routes/filmsList')

//connect to mongodb - check this is working 
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database Connected"))
.catch(err => console.log(err))

app.use('/', FilmListRoute)

//add port and connect to the server 
app.listen(PORT, ()=> console.log("Server Connected"))