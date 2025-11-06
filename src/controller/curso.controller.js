
const CursoSchema = require("../model/cursos.js");
const mongoose = require('mongoose')

const crearCurso = async(req, res) =>{
    try {
        const {name, duration, organization} = req.body
        if(!name || !duration|| !organization ){
            return res
                .status(400)
                .json({
                    msg: "Todos los Campos obligatorios"
                })
        }

        const compararName = await CursoSchema.findOne({
            name: name.trim()
        })

        if(compararName){
            return res
                .status(400)
                .json({
                    msg: "Un curso ya posee ese nombre"
                })
        }

        if(!parseInt(duration)){
            return res
                .status(404)
                .json({
                    msg: "La duracion del curso no es valida"
                })
        }

        if (!req.file || !req.file.path) {
            return res
                .status(400)
                .json({ msg: "La imagen es obligatoria" });
        }

        const newCurso = new CursoSchema({
            name: name.trim(),
            duration,
            organization: organization.trim(),
            imagen: req.file.path
        });

        await newCurso.save()

        res
            .status(200)
            .json(newCurso);

    } catch (error) {
        res.status(500).json({
            msg: "Se produjo un error inesperado:" + error.message
        });
    }
}

const verCursos = async (req, res) =>{
    try {
        let cursos;
        cursos = await CursoSchema.find().select("_id name description duration organization imagen")
        
        if(cursos.length<1){
            return res
                .status(200)
                .json({
                    msg: `No se encontro ningun curso`
                })
        }
    
        res
            .status(200)
            .json(cursos)

    } catch (error) {
        res.status(500).json({
            error: "Se produjo un error inesperado:" + error.message
        });        
    }
}

const actualizarCurso = async (req, res)=>{
    try {
        const {id} = req.params
        const { name, duration, organization } = req.body;
        const cursoEncontrado = await CursoSchema.findById({_id:id})
    
        if(!name || !duration || !organization || !id){
            return res.status(400).json({
                msg: "Se dejaron campos basios"
            })
        }

        if(!cursoEncontrado){
            return res
                .status(400)
                .json({
                    msg: "No se encontro el curso ingresado"
                })
        }
    
        cursoEncontrado.name = name
        cursoEncontrado.duration = duration
        cursoEncontrado.organization = organization
        await cursoEncontrado.save()
    
        res
            .status(200)
            .json({
                msg: "Datos actualizados exitosamente"
            })

    } catch (error) {
        res.status(500).json({
            error: "Se produjo un error inesperado:" + error.message
        });  
    }
}

const eliminarCurso = async(req, res) => {

    try {
        const {id} = req.params

        if (!id) {
            return res.status(400).json({
                msg: "Se dejaron campos basios",
            });
        }
        
        const cursoEncontrado = await CursoSchema.findById({_id:id})
    
        if(!cursoEncontrado){
            return res
                .status(200)
                .json({
                    msg : "No se encontro el curso ingresado"
                })
        }

        await cursoEncontrado.deleteOne({_id:id})

        res
            .status(200)
            .json({
                msg: "Curso eliminado exitosamente"
            })
        
    } catch (error) {
        res
            .status(500)
            .json({
                error: "Se produjo un error inesperado:" + error.message,
            });  
    }
}


module.exports = {
    crearCurso,
    verCursos,
    actualizarCurso,
    eliminarCurso
}