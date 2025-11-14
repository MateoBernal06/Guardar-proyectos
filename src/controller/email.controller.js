
const {transporter} = require('../config/nodemailer.js');
require('dotenv').config()

const sendMsg = async(req, res) => {
    try {
        const { name, subject, email, message } = req.body;
    
        if(!name || !email || !message ||!subject){
            return res.status(400).json({
                msg: "Campos vacíos",
            });
        }
    
        const datos = {
            nameUser: (name || "").trim(),
            subjectUser: (subject || "").trim(),
            emailUser: (email || "").trim(),
            messageUser: (message || "").trim(),
        };
    
        const info = await transporter.sendMail({
            from: `"${datos.subjectUser}" <${datos.emailUser}>`,
            to: process.env.EMAIL_GOOGLE,
            subject: datos.subjectUser,
            html: `
                        <h3>Mensaje de ${datos.nameUser}</h3>
                        <p><b>Correo:</b> ${datos.emailUser}</p>
                        <p><b>Mensaje:</b> ${datos.messageUser}</p>
                    `,
            replyTo: datos.emailUser
        });
    
        res
            .status(200)
            .json({
                msg : 'Mensaje enviado exitosamente',
                info : `${info.messageId}`
            })
        
    } catch (error) {
        res.status(500).json({
            msg: `Error inesperado: ${error.message}`,
        });
    }
}

module.exports = {sendMsg}