require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');

const port = process.env.PORT || 3000;

async function connectWithRetry() {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Base de datos conectada');
      break;
    } catch (error) {
      console.log('Error de conexión, reintentando...', retries, error.message);
      retries--;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  if (retries === 0) {
    throw new Error('No se pudo conectar a la base de datos después de varios intentos');
  }
}

(async () => {
  try {
    await connectWithRetry();
    await sequelize.sync({ alter: true });
    console.log('Base de datos conectada y sincronizada');

    app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();
