const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {

    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        proyecto.save();
        res.json({msg:"Proyecto creado"});
        
    } catch (error) {
        console.log(error);
        res.status(500).sed('Hubo un error');
    }
}