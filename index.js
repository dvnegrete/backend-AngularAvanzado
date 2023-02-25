const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { dbConnection } = require('./databases/config');

const app  = express();

//CORS
app.use(cors());

//BD
dbConnection();

//Routes

app.get('/', (req, res)=>{
    res.json({message: "Hola Mundo"})
})

app.listen( port, ()=> console.log("servidor en el puerto: ", port))