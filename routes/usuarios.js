const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');
//crea un usuarios
//api/usuarios
router.post('/', 
[

    check('nombre', 'El nombre es oligatorio').not().isEmpty(),
    check('email' , 'Agregi un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})

],
usuarioController.crearUsuario);
module.exports = router;

//rutas para crear usuarios
