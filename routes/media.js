const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    }
});

const upload = multer({ storage });

// Ruta para agregar una nueva película (incluyendo imagen)
router.post('/peliculas', upload.single('imagen'), (req, res) => {
    const { nombre, calificacion, duracion, resumen } = req.body;
    const imagen = req.file ? req.file.filename : null; // Guarda el nombre del archivo de imagen

    db.query('INSERT INTO peliculas (nombre, calificacion, duracion, resumen, imagen) VALUES (?, ?, ?, ?, ?)', 
        [nombre, calificacion, duracion, resumen, imagen], 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

// Ruta para agregar una nueva canción (incluyendo imagen)
router.post('/canciones', upload.single('imagen'), (req, res) => {
    const { nombre_album, contenido, anio_lanzamiento, artista, duracion } = req.body;
    const imagen = req.file ? req.file.filename : null; // Guarda el nombre del archivo de imagen

    db.query('INSERT INTO canciones (nombre_album, contenido, anio_lanzamiento, artista, duracion, imagen) VALUES (?, ?, ?, ?, ?, ?)', 
        [nombre_album, contenido, anio_lanzamiento, artista, duracion, imagen], 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

module.exports = router;
