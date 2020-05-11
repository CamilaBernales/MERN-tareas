const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator'); 
exports.crearProyecto = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //guardar creador via json web token
        proyecto.creador = req.usuario.id;
        //guardar proyecto
        proyecto.save();
        // console.log(proyecto)
        res.json({msg:"Proyecto creado"});
    } catch (error) {
        console.log(error);
        res.status(500).sed('Hubo un error');
    }
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//actualiza un proyecto
exports.actualizarProyecto  = async(req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraer infro del proyecto
    const {nombre} = req.body;
    const nuevoProyecto = {};
    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }
    try {
        //revisar id
        let proyecto = await Proyecto.findById(req.params.id);

        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg:"Proyecto no encontrado"});
        }
        //verificar el creador el proyeccto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:"No autorizado"});

        }
        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id:req.params.id}, {$set: 
        nuevoProyecto}, {new: true});
        res.json({proyecto});

    } catch (error) {
    console.log(error);
    res.status(500).send({msg:"Error en el servidor"});
    }    
}

//eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {


      try {
            //revisar id
            let proyecto = await Proyecto.findById(req.params.id);

            //si el proyecto existe o no
            if(!proyecto){
                return res.status(404).json({msg:"Proyecto no encontrado"});
            }
            //verificar el creador el proyeccto
            if(proyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({msg:"No autorizado"});
            }

            //eliminar el proyecto
            await Proyecto.findByIdAndRemove({_id: req.params.id});
            res.json({msg: "Proyecto eliminado"});
        
      } catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor');
      }
}