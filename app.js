const express = require('express')
const cowsay = require('cowsay')
const morgan = require('morgan')
require('./utils/db_Mongo'); //conectarse a la base de datos FakeShop de Mongo


const error404 = require('./middlewares/error404')

// Módulos de Rutas
const productsApiRoutes = require('./routes/productsApiRoutes')
const providersApiRoutes = require('./routes/providersApiRoutes')

const app = express()
const port = 3000

app.use(morgan('dev'))


// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

//Rutas 
app.use('/api/products',productsApiRoutes); // Rutas web API products
app.use('/api/providers', providersApiRoutes);


// Middleware Para ruta no encontrada (404)
app.use(error404); 

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Dándolo todo en http://localhost:${port}!!!`,
            e: "oO",
            T: "U "
        }))
})