const express = require('express');
const cors = require('cors');
const path = require('path');

const { port } = require('./config');
const { dbConnection } = require('./database/config');

const app  = express();

//CORS
app.use(cors());

app.use(express.static('./public'))
//lectura y parseo del body. Esto va antes de la rutas
app.use( express.json() );

//BD
dbConnection();

//Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medico', require('./routes/medico'));

app.use('/api/login', require('./routes/auth'));
app.use('/api/search', require('./routes/search'));
app.use('/api/upload', require('./routes/upload'));

app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
})

app.listen( port, ()=> console.log("servidor en el puerto: ", port))