
const {agregarProyecto, verProyectos, actualizarProyecto, eliminarProyecto} = require('../controller/proyecto_controller.js')
const express = require('express')
const upload = require('../config/multer.js')
const routes = express()

routes.get('/obtener-proyectos', verProyectos)
routes.put('/actualizar-proyecto/:id', actualizarProyecto)
routes.delete('/eliminar-proyecto/:id', eliminarProyecto)
routes.post('/crear-proyecto', upload.fields([
    {name: 'imagen', maxCount: 1},
    { name: 'tecnologys', maxCount: 6 }
]), agregarProyecto)

module.exports = routes
