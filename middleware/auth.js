const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {

    //leer token del header
    const token = req.header('x-auth-token');
    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg:"No hay token. Permiso no valido"})
    }
    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:"Token no válido."})
    }

}