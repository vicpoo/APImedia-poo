const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: 'reyhades2005', // Cambia esto por tu contraseña de MySQL
    database: 'media_db', // Cambia esto por el nombre de tu base de datos
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

module.exports = db;
