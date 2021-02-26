const express = require('express');
const compression =  require ('compression'); 
const app = express();
//const sequelize = require('./conexionBase');
import sequelize from './conexionBase';
app.use(express.json());
app.use(compression());
app.post('/crearUsuario', (req, res) =>{

    usuarios.push(req.body);
    res.status(201).json({status:"Ok", mensaje:'Contacto Agregado'});
    console.log(usuarios)
})
function validarContacto (req, res, next) {
    const { nombre, apellido, email, telefono, direccion, password} = req.body;
    if (!nombre || !apellido || !email || !telefono || !direccion || !password ) {
        return res.status(400)
        .send({status: 'Error', mensaje: 'Dato de del contacto invalido'});
    }
    return next();
}

/*function validarSiExiste (req, res, next) {
    const { email } = req.body;
    const i = usuarios.findIndex(c => c.email == email);
    if ( i >= 0 ) {
        return res.status(409)
        .send({status: 'Error', mensaje: 'el contacto ya existe'});
    }
    return next();
}*/


app.post('/registro', validarContacto, /*validarSiExiste,*/ (req,res) =>{
    let usuario = Object.values(req.body);
    usuario.unshift('NULL')
    console.log(usuario)
    sequelize.query('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?)',
        {replacements: usuario}
    ).then(respuesta => {
        console.log(respuesta)
    })
    res.status(201).json({status:"OK", mensaje: "Contacto Agregado"})
});



app.listen(4000, function(){
    console.log('El server corre en el puerto 4000')
});

