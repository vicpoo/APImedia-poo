const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las películas
router.get('/', (req, res) => {
    db.query('SELECT * FROM peliculas', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener películas' });
        }
        res.json(results);
    });
});

// Agregar una nueva película
router.post('/', (req, res) => {
    const { nombre, calificacion, duracion, resumen } = req.body;
    const sql = 'INSERT INTO peliculas (nombre, calificacion, duracion, resumen) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, calificacion, duracion, resumen], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al agregar película' });
        }
        res.status(201).json({ id: results.insertId, nombre, calificacion, duracion, resumen });
    });
});

// Obtener una película por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM peliculas WHERE id = ?', [id], (error, results) => {
        if (error || results.length === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(results[0]);
    });
});

// Actualizar una película
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, calificacion, duracion, resumen } = req.body;
    const sql = 'UPDATE peliculas SET nombre = ?, calificacion = ?, duracion = ?, resumen = ? WHERE id = ?';
    db.query(sql, [nombre, calificacion, duracion, resumen, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar película' });
        }
        res.json({ id, nombre, calificacion, duracion, resumen });
    });
});

// Eliminar una película
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM peliculas WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar película' });
        }
        res.status(204).send();
    });
});

module.exports = router;
