const ProyectosSchema = require("../model/proyectos.js");

const agregarProyecto = async(req, res) => {

    try {
        const { name, description, github, link  } = req.body;
        const compararName = await ProyectosSchema.findOne({name : name.trim()})
    
        if(!name || !description || !github || !link){
            return res
                .status(400)
                .json({
                    msg: "Ingresar todos los datos"
                })
        }
    
        if(compararName){
            return res
                .status(400)
                .json({
                    msg: "El nombre ya existe"
                })
        }

        const imagen = req.files["imagen"] ? req.files["imagen"][0].path : null;

        const tecnologys = req.files["tecnologys"]
            ? req.files["tecnologys"].map((file) => file.path)
            : [];

        const newProyecto = new ProyectosSchema({
            name,
            description,
            imagen,
            github,
            link,
            tecnologys
        });

        await newProyecto.save()

        res
            .status(200)
            .json({
                msg: "Proyecto creado exitosamente",
                datos: newProyecto
            })
        
    } catch (error) {
        res
            .status(500)
            .json({
                msg: `Error inesperado: ${error.message}`,
            });
    }
}

const verProyectos = async(req, res)=>{
    try {
        let proyectos;
        proyectos = await ProyectosSchema.find().select("_id name description imagen github link tecnologys")
    
        if(proyectos.length<1){
            return res
                .status(200)
                .json({
                    msg: "No se encontro ningun proyecto"
                })
        }
    
        res
            .status(200)
            .json(proyectos)
        
    } catch (error) {
        res.status(500).json({
            msg: `Se produjo un error inesperado: ${error.message}`
        });
    }
}

const actualizarProyecto = async(req, res)=>{
    try {
        const {id} = req.params
        const { name, description, github, link } = req.body;

        if(!id || !name || !description || !github || !link){
            return res.status(400).json({
                msg: "Se dejaron campos basios",
            });
        }
        
        const actualizar = await ProyectosSchema.findById({
            _id : id
        })
    
        if(!actualizar){
            return res.status(400).json({
                msg: "El id no se enceuntra registrado"
            })
        }
    
        const compararName = await ProyectosSchema.findOne({
            name : name.trim()
        })
    
        if(compararName){
            return res.status(400).json({
                msg: "El nombre ya se encuentra registrado"
            })
        }

        actualizar.name = name
        actualizar.description = description
        actualizar.github = github
        actualizar.link = link
        await actualizar.save()
        
        res.status(200).json({
            msg: "Datos actualizados exitosamente",
            datos: actualizar
        })

    } catch (error) {
        res.status(500).json({
            msg: `Se produjo un error inesperado: ${error.message}`,
        });
    }
}

const eliminarProyecto = async(req, res) => {
    try {
        const { id } = req.params

        if(!id){
            return res.status(400).json({
                msg: "Se dejaron campos basios",
            });
        }

        const validacionProyecto = await ProyectosSchema.findOne({_id:id})
        
        if(!validacionProyecto){
            return res.status(200).json({
                msg: "El id no se ecuentra registrado"
            })
        }
        
        const compararName = await ProyectosSchema.findById({_id:id})
        await compararName.deleteOne()
    
        res.status(200).json({
            msg: "Proyecto elimando exitosamente"
        })
        
    } catch (error) {
        res.status(500).json({
            msg: `Se produjo un error inesperado: ${error.message}`
        });
    }
}

module.exports = {
    agregarProyecto,
    verProyectos,
    actualizarProyecto,
    eliminarProyecto
}