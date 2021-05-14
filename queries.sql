/* crear tablas*/
CREATE TABLE `estados` (
  `id` int(11) NOT NULL ,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ordenes_producto` (
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_estados` int(11) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(60) NOT NULL,
  `rutaFoto` varchar(255) DEFAULT 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png ',
  `descripcion` text NOT NULL,
  `precio` int(11) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `telefono` bigint(15) NOT NULL,
  `direccion` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*inserts*/

INSERT INTO `productos` (`id`, `item`, `rutaFoto`, `descripcion`, `precio`) VALUES
(NULL, 'Hamburguesa con queso', 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg', 'Hamburguesa de carne condimentada con salsa de tomate mayonesa y cebolla, con el mejor queso cheddar de la ciudad.', 15000),
(NULL, 'Pizza', 'https://www.portafolio.co/files/article_main/uploads/2016/02/10/56bade6d40020.jpeg', 'La mejor pizza con pepperoni y mozzarella bien caliente.', 20000),
(NULL, 'perro con papass', 'https://mariobross.com.co/wp-content/uploads/2018/09/Mario-Bross-Perro-Americano.jpg', 'El mejor perro con cebolla, queso, guacamole, salas y papitas', 11000),
(NULL, 'patacon con todo', 'https://lh3.googleusercontent.com/proxy/dFBKdWa3gBNb5jkTvRbPuClOWyPL0M7z4_ABKS6yeH8g1Kj2VaDd9V9K44Ucu8vAFHjzQfUB4aHtpJsHna4fkTExjkMIO0HTC4XWm6D5DdCtj_kAimskQz0L2n99pyAF7vuZc5mqvEVQj4Aj9NNjmWEBW7Jp7oAh8W3Tua0', 'Patacon con trocitos de pollo con champiñones en salsa bechamel, carne desmechada en salsa criolla, maíz tierno y tocineta ahumada, todo cubierto con queso a elección, servido con guacamole y hogao', 13000),
(NULL, 'arepaburguer', 'https://arepasco.com/wp-content/uploads/2020/05/94758314_521874165354950_154409490340628257_n.jpg', 'arepa con carne queso tocineta lechuga salsas en forma de hamburguesa', 4500),
(NULL, 'arroz con pollo', 'https://sifu.unileversolutions.com/image/es-CO/recipe-topvisual/2/1260-709/arroz-con-pollo-50525292.jpg', 'un delicioso arroz con pollo con verduras y un poco de ketchup', 10000);

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `password`) VALUES
(NULL, 'admin', '', 'admin', 'admin@hotmail.com', 3053584691, 'carrera 47', '1234')

INSERT INTO `estados` (`id`, `descripcion`) VALUES ('1', 'NUEVO'), ('2', 'CONFIRMADO'), ('3', 'PREPARANDO'), ('4', 'ENVIADO'), ('5', 'CANCELADO'), ('6', 'ENTREGADO');


