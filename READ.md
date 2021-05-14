Para iniciar la DB:
1. se debe inicar un servidor apache y PhpMyAdmin corriendo en (XAMPP) con una estructura llamada delilah_resto. 
2.copiar las queries del archivo queries.sql y correrlas en la consola SQL. esto creara las tablas y creara algunos registros dentro de la base

para inicializar el servidor  se debe :
1. git clone https://github.com/Juanes3312/delilahresto.git

2. npm install

3. nodemon index || node index

para probar las apis se debe tener postman y seguir la documentacion de swagger 

Condición 1: Poder registrar un nuevo usuario.

para registrar un nuevo usuario se debe ingresar los siguientos datos en un body como json:  usuario, nombre, apellido, email, telefono, direccion, password

Condición 2: Un usuario debe poder listar todos los productos disponibles.

se debe tener un token de usuario y llamar a la api de get/productos

Condición 3: Un usuario debe poder generar un nuevo pedido al restaurante con un listado de platos que desea.

se debe tener un token de usuario y enviar un array con los id de los productos que desea

Condición 4: El usuario con roles de administrador debe poder actualizar el estado del pedido.

para actualizar se debe hacer un llamado a la api post/productos/estados/{id}

Condición 5: Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos)

se debe obtener el token de admin para acceder a la edicion de productos

Condición 6: Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido. Tampoco debe poder acceder a información de otros usuarios.

el usuario con token que no sea de admin no puede chaer esos cambios\


enlace de github: https://github.com/Juanes3312/delilahresto