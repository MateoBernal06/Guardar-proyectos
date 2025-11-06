
const { crearCurso, verCursos, actualizarCurso, eliminarCurso } = require('../controller/curso.controller.js');
const upload = require('../config/multer.js')
const express = require('express')

const router = express()

router.get("/obtener-cursos", verCursos)
router.post("/crear-curso", upload.single('imagen'), crearCurso);
router.put("/actualizar-curso/:id", actualizarCurso)
router.delete("/eliminar-curso/:id", eliminarCurso)

module.exports = router

