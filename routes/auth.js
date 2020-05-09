const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const {check} = require('express-validator');
//crea un usuarios
//api/auth
router.post('/', 
[

    check('email' , 'Agregi un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})

], authController.autenticarUsuario
    );
module.exports = router;

//rutas para crear usuarios
