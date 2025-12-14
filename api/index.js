const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("colors");
require("dotenv").config();

const connection = require("../src/database.js");
const cursos = require("../src/routes/curso.routes.js");
const proyectos = require("../src/routes/proyecto.routes.js");
const email = require("../src/routes/email.routes.js");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));

// Conectar a la base de datos
connection();

// Rutas
app.get("/", (req, res) => {
    res.send("Server OK");
});

app.use("/api", cursos);
app.use("/api", proyectos);
app.use("/api", email);

// Manejo de rutas no encontradas
app.use("/", (req, res, next) => {
    res.status(404).json({
        status: 404,
        msg: "Error Not Found 404",
    });

    next();
});

module.exports = app;
