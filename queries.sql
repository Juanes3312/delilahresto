/* crear tablas*/
CREAT TABLE `delilah_resto`. `usuarios` (`id` int NOR NULL AUTO_INCREMENT,`usuario` VARCHAR(20), `nombre` VARCHAR(20), `apellido` VARCHAR(40), `email` VARCHAR (40),`telefono` BIGINT, `direccion` VARCHAR(40), `password` VARCHAR(25) )

CREATE TABLE `delilah_resto`.`productos` ( `id` INT NOT NULL AUTO_INCREMENT , `item` VARCHAR(60) NOT NULL , `rutaFoto` VARCHAR(255) NULL DEFAULT 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png ' , `descripcion` TEXT NOT NULL , `precio` INT NOT NULL, PRIMARY KEY (`id`));

CREATE TABLE `delilah_resto`.`estados` ( `id` INT NOT NULL , `descripcion` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`));

CREATE TABLE `delilah_resto`.`orders`(`id` INT NOT NULL AUTO_INCREMENT, `id_usuario` INT NOT NULL, `id_estados` INT NOT NULL, PRIMARY KEY(`id`));

CREATE TABLE `delilah_resto`.`ordenes_producto`(`id_pedido` INT NOT NULL, `id_producto` INT NOT NULL);


/*inserts*/

INSERT INTO `productos` (`id`, `item`, `rutaFoto`, `descripcion`, `precio`) VALUES (NULL, 'Hamburguesa con queso', 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg', 'Hamburguesa de carne condimentada con salsa de tomate mayonesa y cebolla, con el mejor queso cheddar de la ciudad.', '15000'), (NULL, 'Pizza', 'https://www.portafolio.co/files/article_main/uploads/2016/02/10/56bade6d40020.jpeg', 'La mejor pizza con pepperoni y mozzarella bien caliente.', '20000'),(NULL, 'Perro', 'https://mariobross.com.co/wp-content/uploads/2018/09/Mario-Bross-Perro-Americano.jpg','El mejor perro con cebolla, queso, guacamole, salas y papitas', '10000'),(NULL,'patacon con todo', 'https://lh3.googleusercontent.com/proxy/dFBKdWa3gBNb5jkTvRbPuClOWyPL0M7z4_ABKS6yeH8g1Kj2VaDd9V9K44Ucu8vAFHjzQfUB4aHtpJsHna4fkTExjkMIO0HTC4XWm6D5DdCtj_kAimskQz0L2n99pyAF7vuZc5mqvEVQj4Aj9NNjmWEBW7Jp7oAh8W3Tua0','Patacon con trocitos de pollo con champiñones en salsa bechamel, carne desmechada en salsa criolla, maíz tierno y tocineta ahumada, todo cubierto con queso a elección, servido con guacamole y hogao', '13000'),(NULL,"arroz con pollo", "https://sifu.unileversolutions.com/image/es-CO/recipe-topvisual/2/1260-709/arroz-con-pollo-50525292.jpg", "un delicioso arroz con pollo con verduras y un poco de ketchup", "10.000");

INSERT INTO `usuarios` (`id`,`usuario`,`nombre`, `apellido`, `email`, `telefono`,`direccion`, `password`) VALUES (NULL, `admin`,`admin`,`admin`,`admin@hotmail.com`,`12345678978`,`admin`,`1234`);

INSERT INTO `estados` (`id`, `descripcion`) VALUES ('1', 'NUEVO'), ('2', 'CONFIRMADO'), ('3', 'PREPARANDO'), ('4', 'ENVIADO'), ('5', 'CANCELADO'), ('6', 'ENTREGADO');