const express = require('express');
const compression = require('compression');
const app = express();
const sequelize = require('./conexionBase');
app.use(express.json());

app.use(compression());

function validarNuevoContacto(req, res, next) {
    const {
        usuario,
        nombreYapellido,
        email,
        telefono,
        direccion,
        password
    } = req.body;
    if (!usuario || !nombreYapellido || !email || !telefono || !direccion || !password) {
        return res.status(400)
            .send({
                status: 'Error',
                mensaje: 'Dato de del contacto invalido'
            });
    }
    return next();
}
async function traerUsuarios() {
    const res = await sequelize.query('SELECT * FROM usuarios', {
        type: sequelize.QueryTypes.SELECT
    })
    return res;
}

async function validarSiExiste(req, res, next) {
    const usuarios = await traerUsuarios();
    const {email} = req.body;

    const i = usuarios.findIndex(c => {
        return c.email == email; 
    })
    //console.log(i)
    if (i >= 0) {
        return res.status(409)
            .send({
                status: 'Error',
                mensaje: 'el contacto ya existe'
            });
    }
    return next();
}

async function validarLogin(req, res, next) {
    const usuarios = await traerUsuarios();
    const {usuario, password} = req.body;

    const i = usuarios.findIndex(c => {
        return c.usuario == usuario; 
    })
    const e = usuarios.findIndex(c =>{
        return c.password == password;
    })
    //console.log(i)
    if (i == -1) {
        if( e == -1){
            return res.status(409)
                .send({
                    status: 'Error',
                    mensaje: 'el contacto no existe'
                })
        }
        return res.status(409)
            .send({
                status: 'Error',
                mensaje: 'el contacto no existe'
            });
    }
    return next();
}

app.post('/login',validarLogin,(req,res)=>{
    const usuario = req.body;
    console.log(usuario);

    res.status(200).json({
        status:"Ok",
        mensaje: 'Sesion iniciada' 
    })
    
})

app.post('/registro', validarNuevoContacto, validarSiExiste, (req, res) => {
    let usuario = Object.values(req.body);
    usuario.unshift('NULL')
    console.log(usuario)
    sequelize.query('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?)', {
        replacements: usuario
    }).then(respuesta => {
        console.log(respuesta)
    })
    res.status(201).json({
        status: "OK",
        mensaje: "Contacto Agregado"
    })
});

app.listen(4000, function () {
    console.log('El server corre en el puerto 4000')
});