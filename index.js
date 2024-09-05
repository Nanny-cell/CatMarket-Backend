const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors')

const port = process.env.PORT;

//crear servidor express
const app = express();

//Data base
dbConnection();

//CORS
app.use(cors())


//Directorio Publico
app.use( express.static('public'));


//Lectura y parseo
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/marca', require('./routes/marca'));
app.use('/api/tipoProducto', require('./routes/tipoProducto'));



// Escuchar peticiones
app.listen(port, () => {
    console.log('Servidor corriendo en puerto: ' + port);
})