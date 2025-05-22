const express = require('express')
require('dotenv').config()
const authRoutes = require('./routes/auth.routes');
const sequelize = require('./config/db');
const port = process.env.PORT

const app = express()
app.use(express.json())

app.use('/auth', authRoutes); // <== rutas montadas

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