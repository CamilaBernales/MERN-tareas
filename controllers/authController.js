const Usuario = require('../models/Usuario');
const bcryptjs= require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    //revisamos si hay errores
    const errores  = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraer el email y password
    const {email, password} = req.body;
    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usaurio no existe'});
        }
        //revisamos password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:"Password incorrecto"});
        }
        //si tood el correcto
        //crear y fiarma jsonwebtoken
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //si todo es correcto creary firmar token
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            //mensaje de confirmacion
            res.json({token});
        });
    } catch (error) {
        console.log(error);
    }
}