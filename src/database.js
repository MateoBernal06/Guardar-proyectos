
const mongoose = require('mongoose')
require('colors')
require('dotenv').config()

const connection = async() =>{
    try {
        await mongoose.connect(process.env.URL_MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected Data Base!".bgGreen)
    } catch (error) {
        console.log(`Se produjo el siguiente error: ${error.message}`);
        process.exit(1)
    }
}

module.exports = connection
