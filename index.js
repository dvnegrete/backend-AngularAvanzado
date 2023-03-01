const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { dbConnection } = require('./databases/config');

const app  = express();

//CORS
app.use(cors());

//lectura y parseo del body. Esto va antes de la rutas
app.use( express.json() );

//BD
dbConnection();

//Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/auth'))



app.get('/', (req, res)=>{
    res.json({message: "Hola Mundo"})
})

app.listen( port, ()=> console.log("servidor en el puerto: ", port))