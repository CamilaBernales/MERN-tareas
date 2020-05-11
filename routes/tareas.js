const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')
//crea una tarea
//api/tareas
router.post('/',
auth,
[
    check('nombre', 'El nombre de la tarea es oligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto de la tarea es oligatorio').not().isEmpty()

]
,
tareaController.crearTarea
);
//obtener tareas por proyecto
router.get('/',auth,
tareaController.obtenerTareas
);
//actualizar tareas
router.put('/:id', auth,
tareaController.actualizarTarea
);
router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
);
module.exports = router;