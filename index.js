const express = require('express');
const compression = require('compression');
const app = express();
const sequelize = require('./conexionBase');
const jwt = require('jsonwebtoken');
const signature = 'ju4n3s'
app.use(express.json());

app.use(compression());



function getToken(data){
    const resp = jwt.sign(data, signature);
    return resp;
}


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




async function validarSiExiste(req, res, next){
    const usuarios = await traerUsuarios();
    const {email} = req.body;

    const i = usuarios.findIndex(c => {
        return c.email == email; ``
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
    if( i > -1){
        const e = usuarios[i];
        if(e.password == password){
            next();
        }
        else{
            return res.status(409)
            .send({
                status: 'Error',
                mensaje: 'el contacto no existe o los datos son incorrectos'
            });
        }
    }
    //console.log(usuarios)
    if (i == -1) {
        return res.status(409)
            .send({
                status: 'Error',
                mensaje: 'el contacto no existe'
            });
    }
    return next();
}

function isAdmin(req,res,next){
    const token = req.headers['access_token']
    const usuario = "admin"//cambiar mas adelante
    const password = "1234" // cambiar a traer de la base mas adelante

    console.log(usuario +' '+password); //este es admin
    const decoded = jwt.verify(token, signature);
    console.log(decoded);
    if(decoded.usuario == usuario && decoded.password == password){
        return next();
    }else{
        res.status(401).json({
            auth:false,
            message: 'no tienes permisos para esta accion'
        })
    }
}

function setProducts(req,res,next){
    const {name,foto,descripcion,precio} = req.body;
    sequelize.query(
        "INSERT INTO productos (item,rutaFoto,descripcion,precio) VALUES (?,?,?,?)",
        {
            replacements:[name,foto,descripcion,precio],
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(()=>{
        next();
    });
}

function validartoken(req,res,next){
    try {
        const token = req.headers.access_token;
        console.log(token);
        const validData = jwt.verify(token, signature);
        console.log(validData);
        if (validData) {
          req.userData = validData.userData;
          next();
        }
      } catch (err) {
        res.status(401).json("Error al validar usuario. Prueba un token válido.");
      }
}

async function traidaProducto(a){
    const res = await sequelize.query('SELECT * FROM productos WHERE productos.id = ?',{replacements:[a],type: sequelize.QueryTypes.SELECT});
    return res;
   
}

app.put('/productos/:id', validartoken, isAdmin, async function e(req, res){
    const a = req.params.id;
    const producto = await traidaProducto(a);
    const {name,foto,descripcion,precio} = req.body;
    //console.log(producto[0], 'soy producto')
    if(producto[0]){
        sequelize.query("UPDATE `productos` SET `item` = ?, `rutaFoto` = ?, `descripcion` = ?, `precio` = ? WHERE `productos`.`id` = ?",
            {
                replacements:[
                    name,
                    foto,
                    descripcion,
                    precio,
                    req.params.id
                ],
                type: sequelize.QueryTypes.UPDATE
            }
        )
        .then(()=>{
            res.status(200).json({
                "mensaje": "el producto ha sido modificado con exito"
            })
        })
    }else{
        res.status(400).json({
            "mensaje":"No existe un producto con ese id"
        });
    }
});



app.get("/productos", validartoken, (req, res) => {
    sequelize
      .query("SELECT * FROM productos", {
        type: sequelize.QueryTypes.SELECT
      })
      .then(results => {
        res.json(results);
      });
  });

app.get('/usuario/:id', validartoken, isAdmin,(req,res)=>{
    let id_user = req.params.id;
  sequelize
    .query("SELECT * FROM usuarios WHERE.id = ?", {
      replacements: [id_user],
      type: sequelize.QueryTypes.SELECT
    })
    .then((result) => {
      if(result[0]){
        res.json(result[0]);
      }else{
        res.json("No se ha encontrado el usuario.")
      }
    });
})

app.post('/productos',isAdmin,setProducts,(req,res)=>{
    res.status(201).json({
        status:'Ok',
        message:'Producto insertado en la base de datos'
    })
})


app.get('/usuarios',validartoken, isAdmin, (req,res) =>{
    sequelize
    .query("SELECT * FROM usuarios", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
        res.status(200).json(results)
    });
})



app.get("/users/:id", validartoken, isAdmin,(req,res) =>{
    let id = req.params.id;
    sequelize.query (
        "SELECT * FROM  usuarios WHERE usuarios.id = ?",{
            replacements : id,
            type: sequelize.QueryTypes.SELECT
        }
    ).then((resultado)=>{
        if(resultado[0]){
            res.status(200).json(resultado[0]);
        }else{
            res.json({
                status:'fallido',
                mensaje:'no se pudo encontrar el usuario'
            })   
                 
        }
    })
})


app.post('/login',validarLogin, (req,res)=>{
    const usuario = req.body;
    console.log(usuario);
    res.status(200).json({
        status:"Ok",
        mensaje: 'Sesion iniciada',
        token: getToken(usuario)
    })
    
})

app.post('/registro', validarNuevoContacto, validarSiExiste, (req, res) => {
    let usuario = Object.values(req.body);
    usuario.unshift('NULL');
    console.log(usuario)
    sequelize.query('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?)', {
        replacements: usuario
    }).then(respuesta => {
        console.log(respuesta);
    })
    res.status(201).json({
        status: "OK",
        mensaje: "Contacto Agregado"
    })
});

app.listen(4000, function () {
    console.log('El server corre en el puerto 4000')
});