const express = require('express')
const morgan = require('morgan')
const cursos = require('./routes/curso.routes.js')
const proyectos = require('./routes/proyecto.routes.js')
require('colors')
const connection = require('./database.js')
require("dotenv").config();
const cors = require('cors')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin : process.env.FRONTEND_URL}))
connection()


app.get('/', (req, res)=>{
    res.send('Server OK')
})

app.use('/api', cursos)
app.use('/api', proyectos)

app.use('/', (req, res, next)=>{
    res
        .status(404)
        .json({
            status: 404,
            msg: 'Error Not Found 404'
        })
    
    next()
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server on Port ${process.env.PORT}`.bgBlue)
})