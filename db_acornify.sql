-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2023 a las 00:57:47
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_acornify`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `UsuarioConTarjeta` (IN `p_rut` VARCHAR(50), IN `p_nombre` VARCHAR(50), IN `p_email` VARCHAR(50), IN `p_password` VARCHAR(50))   BEGIN
    DECLARE v_tarjeta_id INT;

	-- Insertar la tarjeta asociada al usuario
    INSERT INTO tarjeta (puntos, rfidtag) VALUES (0, null);
    SET v_tarjeta_id = LAST_INSERT_ID();
    
    -- Insertar el usuario
    INSERT INTO usuario (rut_usuario, nombre_usuario, email_usuario, password_usuario, id_tarjeta_fk) VALUES (p_rut, p_nombre, p_email, p_password, v_tarjeta_id);
    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canje`
--

CREATE TABLE `canje` (
  `id_canjes` int(11) NOT NULL,
  `id_usuario_fk` int(11) NOT NULL,
  `id_recompensa_fk` int(11) NOT NULL,
  `id_tienda_fk` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `fecha_canje` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `canje`
--

INSERT INTO `canje` (`id_canjes`, `id_usuario_fk`, `id_recompensa_fk`, `id_tienda_fk`, `estado`, `fecha_canje`) VALUES
(1, 1, 2, 3, 1, '2023-06-01 08:13:30'),
(2, 1, 3, 3, 1, '2023-06-01 17:25:46'),
(3, 1, 8, 1, 0, '2023-06-15 18:33:46'),
(4, 1, 8, 1, 0, '2023-06-15 10:17:45'),
(5, 1, 1, 1, 0, '2023-06-15 18:21:34'),
(6, 1, 1, 1, 0, '2023-06-15 20:27:31'),
(25, 1, 1, 1, 0, '2023-06-15 13:51:54'),
(26, 1, 1, 1, 0, '2023-06-15 07:29:43'),
(27, 1, 1, 1, 0, '2023-06-15 09:35:29'),
(28, 1, 1, 1, 0, '2023-06-15 17:37:24'),
(29, 1, 1, 1, 0, '2023-06-15 10:45:44'),
(30, 1, 1, 1, 0, '2023-06-15 15:30:46'),
(31, 1, 1, 1, 0, '2023-06-15 17:27:44'),
(32, 1, 1, 1, 0, '2023-06-15 14:21:38'),
(33, 1, 1, 1, 0, '2023-06-21 10:30:37'),
(34, 1, 1, 1, 0, '2023-06-21 14:40:39'),
(35, 1, 1, 1, 0, '2023-06-21 17:37:47'),
(36, 1, 8, 1, 0, '2023-06-21 11:28:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensa`
--

CREATE TABLE `recompensa` (
  `id_recompensa` int(11) NOT NULL,
  `id_tienda_fk` int(11) NOT NULL,
  `nombre_producto` varchar(300) NOT NULL,
  `descripcion_producto` varchar(300) NOT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  `meta_canje` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensa`
--

INSERT INTO `recompensa` (`id_recompensa`, `id_tienda_fk`, `nombre_producto`, `descripcion_producto`, `imagen`, `meta_canje`, `estado`) VALUES
(1, 1, 'Café en vaso', 'Que rico el cafecito en vaso', '86e86eed-84b1-49d5-a31a-c87452591e41.jpg', 8, 0),
(2, 3, 'Sandwichin', 'Que rico el pancito', 'a466c220-84d0-455d-a944-e0bdc47dae6d.jpg', 40, 0),
(3, 3, 'Sanwichoide', 'Que rico el sandwichoide', '0d742ab1-cf88-4f2a-a02b-dd2db5d706af.jpg', 25, 0),
(4, 3, 'Sandwuchon', 'Que rico el sandwuchon', 'da18f617-094e-4104-8397-aa410e35278a.jpg', 15, 0),
(5, 2, 'Pastelin Red Velvet', 'Que rico el pastelito', '15c2b2b5-5604-404b-944d-f5bb040ec2f5.jpg', 15, 0),
(6, 2, 'Dona a elección', 'Que rica la donita', '95a30139-19fa-43b2-b2e8-e10f6efa6047.jpg', 10, 0),
(7, 1, 'Café Cortado', 'Que rico el cafecito ', '263ebfb9-f157-43a2-b2af-2bf3d268e618.jpg', 12, 0),
(8, 1, 'Café Americano', 'Que rico el café americano', 'f318c49c-dd3a-4398-8805-aceff5f2a605.jpg', 15, 0),
(9, 3, 'Sandwich 2', 'que rico', '089530dd-9488-4dcb-a7ee-157138d91acb.jpg', 30, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_compra`
--

CREATE TABLE `registro_compra` (
  `id_registro_compra` int(11) NOT NULL,
  `id_usuario_fk` int(11) NOT NULL,
  `id_tienda_fk` int(11) NOT NULL,
  `puntos_compra` int(11) NOT NULL,
  `fecha_compra` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_compra`
--

INSERT INTO `registro_compra` (`id_registro_compra`, `id_usuario_fk`, `id_tienda_fk`, `puntos_compra`, `fecha_compra`) VALUES
(1, 1, 2, 1, '2023-05-05 10:03:12'),
(2, 1, 1, 1, '2023-05-05 10:12:12'),
(3, 1, 1, 1, '2023-05-05 06:23:03'),
(4, 1, 1, 1, '2023-05-05 19:32:45'),
(5, 1, 1, 1, '2023-06-21 13:40:20'),
(6, 1, 1, 1, '2023-06-21 11:42:25'),
(7, 1, 1, 1, '2023-06-21 16:07:48'),
(8, 1, 3, 1, '2023-06-21 15:25:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `id_tarjeta` int(11) NOT NULL,
  `puntos` int(11) NOT NULL,
  `rfidtag` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`id_tarjeta`, `puntos`, `rfidtag`) VALUES
(1, 727, 'F3 20 A4 04'),
(2, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_tienda` int(11) NOT NULL,
  `rut_tienda` varchar(60) DEFAULT NULL,
  `nombre_tienda` varchar(60) NOT NULL,
  `email_tienda` varchar(60) NOT NULL,
  `password_tienda` varchar(60) NOT NULL,
  `logo` varchar(300) DEFAULT NULL,
  `ubicacion_tienda` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_tienda`, `rut_tienda`, `nombre_tienda`, `email_tienda`, `password_tienda`, `logo`, `ubicacion_tienda`) VALUES
(1, '76129263-3', 'Cafeterin Bombin', 'cafeterin@bombin.com', '123', '5a0e3cea955fde66f5e8e4e07c8759a1.jpg', 'Gamero #145, Rancagua'),
(2, '20920559-8', 'Pastelerin Bombin', 'pastelerin@bombin.com', '123', 'a425a6c9-209f-470c-bcf1-90ee9b815312.jpg', 'O\'carrol #132'),
(3, '20920559-7', 'Sanwicherin Bombin', 'sandwicherin@bombin.com', '123', '4a509765-f9de-4f7e-bfcf-9532c149a6e2.jpg', 'Av España #1245');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `rut_usuario` varchar(60) NOT NULL,
  `nombre_usuario` varchar(60) NOT NULL,
  `email_usuario` varchar(60) NOT NULL,
  `password_usuario` varchar(60) NOT NULL,
  `id_tarjeta_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `rut_usuario`, `nombre_usuario`, `email_usuario`, `password_usuario`, `id_tarjeta_fk`) VALUES
(1, '20920559-9', 'Alexis Sanchez', 'Alexis@Sanchez.com', '123', 1),
(2, '20922555-7', 'Daniel Marchant', 'daniel@marchant.com', '123', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canje`
--
ALTER TABLE `canje`
  ADD PRIMARY KEY (`id_canjes`),
  ADD KEY `id_usuario_fk` (`id_usuario_fk`),
  ADD KEY `id_tienda_fk` (`id_tienda_fk`),
  ADD KEY `id_recompensa_fk` (`id_recompensa_fk`);

--
-- Indices de la tabla `recompensa`
--
ALTER TABLE `recompensa`
  ADD PRIMARY KEY (`id_recompensa`),
  ADD KEY `id_tienda_fk` (`id_tienda_fk`);

--
-- Indices de la tabla `registro_compra`
--
ALTER TABLE `registro_compra`
  ADD PRIMARY KEY (`id_registro_compra`),
  ADD KEY `id_tienda_fk` (`id_tienda_fk`),
  ADD KEY `id_usuario_fk` (`id_usuario_fk`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`id_tarjeta`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_tienda`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_tarjeta_fk` (`id_tarjeta_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canje`
--
ALTER TABLE `canje`
  MODIFY `id_canjes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `recompensa`
--
ALTER TABLE `recompensa`
  MODIFY `id_recompensa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `registro_compra`
--
ALTER TABLE `registro_compra`
  MODIFY `id_registro_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `id_tarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id_tienda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `canje`
--
ALTER TABLE `canje`
  ADD CONSTRAINT `canje_ibfk_1` FOREIGN KEY (`id_usuario_fk`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `canje_ibfk_2` FOREIGN KEY (`id_tienda_fk`) REFERENCES `tienda` (`id_tienda`),
  ADD CONSTRAINT `canje_ibfk_3` FOREIGN KEY (`id_recompensa_fk`) REFERENCES `recompensa` (`id_recompensa`);

--
-- Filtros para la tabla `recompensa`
--
ALTER TABLE `recompensa`
  ADD CONSTRAINT `recompensa_ibfk_1` FOREIGN KEY (`id_tienda_fk`) REFERENCES `tienda` (`id_tienda`);

--
-- Filtros para la tabla `registro_compra`
--
ALTER TABLE `registro_compra`
  ADD CONSTRAINT `registro_compra_ibfk_1` FOREIGN KEY (`id_tienda_fk`) REFERENCES `tienda` (`id_tienda`),
  ADD CONSTRAINT `registro_compra_ibfk_2` FOREIGN KEY (`id_usuario_fk`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tarjeta_fk`) REFERENCES `tarjeta` (`id_tarjeta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
