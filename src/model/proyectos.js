const {Schema, model} = require('mongoose')

const ProyectosSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        github: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: ""
        },
        tecnologys: {
            type: [String],
            required: true,
            default: []
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Proyectos", ProyectosSchema)