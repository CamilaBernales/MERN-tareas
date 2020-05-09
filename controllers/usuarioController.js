const Usuario = require('../models/Usuario');
const bcryptjs= require('bcryptjs')
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    //extraer emaail y password
    const {email, password} = req.body

    try {
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        //crea usuario
        usuario = new Usuario(req.body); 

        //hasear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        //guardar usuario
        await usuario.save();

        //crear y fiarma jsonwebtoken
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //firmar token
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            //mensaje de confirmacion
            res.json({token});
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error.'); 
    }
}