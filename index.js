const express = require('express');
const conectarDb  = require('./config/db');
const cors = require('cors');

//creo servidor
const app = express();

//conectar bd 
conectarDb();
//habilidar cors
app.use(cors());
//habilitar express.js
app.use(express.json({extended: true}))
//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyecto'));
app.use('/api/tareas', require('./routes/tareas'));


//arrancar la app
app.listen(PORT, () => {
    console.log("Sevidor Funcionando");
})