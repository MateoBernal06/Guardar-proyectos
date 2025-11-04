const {Schema, model} = require('mongoose')

const CursoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        duration: {
            type: Number,
            min: 0,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        imagen: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Curso", CursoSchema)