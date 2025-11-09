
const {agregarProyecto, verProyectos, actualizarProyecto, eliminarProyecto} = require('../controller/proyecto.controller.js')
const express = require('express')
const upload = require('../config/multer.js')
const routes = express()

routes.get('/obtener-proyectos', verProyectos)
routes.put('/actualizar-proyecto/:id', actualizarProyecto)
routes.delete('/eliminar-proyecto/:id', eliminarProyecto)
routes.post('/crear-proyecto', upload.single('imagen'), agregarProyecto)

module.exports = routes
