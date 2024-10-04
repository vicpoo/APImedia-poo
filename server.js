const express = require('express');
const app = express();
const db = require('./db');
const peliculasRoutes = require('./routes/peliculas');
const cancionesRoutes = require('./routes/canciones');

app.use(express.json());
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/canciones', cancionesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
