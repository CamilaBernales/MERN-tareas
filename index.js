const express = require('express');
const conectarDb  = require('./config/db');


//creo servidor
const app = express();

//conectar bd 
conectarDb();
//habilitar express.js
app.use(express.json({extended: true}))
//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyecto'));


//arrancar la app
app.listen(PORT, () => {
    console.log("Sevidor Funcionando");
})