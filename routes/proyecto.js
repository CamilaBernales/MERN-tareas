const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')
//crea proyectos
//api/proyectos
router.post('/' ,
auth,
[
    check('nombre', 'El nombre del proyecto es oligatorio').not().isEmpty()
],
proyectoController.crearProyecto
);
//obtener todos los proyectos del usuario
router.get('/' ,
auth,
proyectoController.obtenerProyectos
);
//actualizar proyecto via id
router.put('/:id' ,
auth,
[
    check('nombre', 'El nombre del proyecto es oligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto
);
//eliminar protecto
router.delete('/:id' ,
auth,
proyectoController.eliminarProyecto
);

module.exports = router;