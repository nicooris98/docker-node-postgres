const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const sequelize = require('./config/db');
require('dotenv').config()

const port = process.env.PORT

const app = express()
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

async function connectWithRetry() {
    let retries = 5;
    while (retries) {
        try {

            await sequelize.authenticate();
            console.log('Base de datos conectada');
            break;
        } catch (error) {
            console.log('Error de conexión, reintentando...', retries, error.message);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    if (retries === 0) {
        throw new Error('No se pudo conectar a la base de datos después de varios intentos');
    }
}

// Sincronización y arranque del servidor
(async () => {
    try {
        await connectWithRetry();
        await sequelize.sync({ alter: true }); // crea tablas si no existen
        console.log('Base de datos conectada y sincronizada');

        app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();