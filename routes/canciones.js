const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las canciones
router.get('/', (req, res) => {
    db.query('SELECT * FROM canciones', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener canciones' });
        }
        res.json(results);
    });
});

// Agregar una nueva canción
router.post('/', (req, res) => {
    const { nombre_album, contenido, anio_lanzamiento, artista, duracion } = req.body;
    const sql = 'INSERT INTO canciones (nombre_album, contenido, anio_lanzamiento, artista, duracion) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre_album, contenido, anio_lanzamiento, artista, duracion], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al agregar canción' });
        }
        res.status(201).json({ id: results.insertId, nombre_album, contenido, anio_lanzamiento, artista, duracion });
    });
});

// Obtener una canción por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM canciones WHERE id = ?', [id], (error, results) => {
        if (error || results.length === 0) {
            return res.status(404).json({ error: 'Canción no encontrada' });
        }
        res.json(results[0]);
    });
});

// Actualizar una canción
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_album, contenido, anio_lanzamiento, artista, duracion } = req.body;
    const sql = 'UPDATE canciones SET nombre_album = ?, contenido = ?, anio_lanzamiento = ?, artista = ?, duracion = ? WHERE id = ?';
    db.query(sql, [nombre_album, contenido, anio_lanzamiento, artista, duracion, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar canción' });
        }
        res.json({ id, nombre_album, contenido, anio_lanzamiento, artista, duracion });
    });
});

// Eliminar una canción
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM canciones WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar canción' });
        }
        res.status(204).send();
    });
});

module.exports = router;
