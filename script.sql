CREATE TABLE tarjeta (

    id_tarjeta INT AUTO_INCREMENT PRIMARY KEY,
    puntos INT not null,
    rfidtag varchar(200)

);

CREATE TABLE usuario(

    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    rut_usuario varchar(60) not null,
    nombre_usuario varchar(60) not null,
    email_usuario varchar(60) not null,
    password_usuario varchar(60) not null,
    id_tarjeta_fk INT not null,
    FOREIGN KEY (id_tarjeta_fk) REFERENCES tarjeta(id_tarjeta)
);

CREATE TABLE tienda(

    id_tienda INT AUTO_INCREMENT PRIMARY KEY,
    rut_tienda varchar(60),
    nombre_tienda varchar(60) not null,
    email_tienda varchar(60) not null,
    password_tienda varchar(60) not null,
    logo varchar(300),
    ubicacion_tienda varchar(100) not null

);

CREATE TABLE recompensa(

    id_recompensa INT AUTO_INCREMENT PRIMARY KEY,
    id_tienda_fk INT NOT NULL,
    nombre_producto VARCHAR(300) NOT NULL,
    descripcion_producto VARCHAR(300) NOT NULL,
    imagen VARCHAR(300),
    meta_canje INT NOT NULL,
    estado boolean not null,
    FOREIGN KEY (id_tienda_fk) REFERENCES tienda(id_tienda)

);

CREATE TABLE registro_compra (

    id_registro_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_fk INT not null,
    id_tienda_fk INT not null,
    estado boolean not null,
    fecha_compra DATE,
    FOREIGN KEY (id_tienda_fk) REFERENCES tienda(id_tienda),
    FOREIGN KEY (id_usuario_fk) REFERENCES usuario(id_usuario)

);

CREATE TABLE canje (

    id_canjes INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_fk INT not null,
    id_recompensa_fk INT not null,
    id_tienda_fk INT not null,
    fecha_canje DATE,
    FOREIGN KEY (id_usuario_fk) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_tienda_fk) REFERENCES tienda(id_tienda),
    FOREIGN KEY (id_recompensa_fk) REFERENCES recompensa(id_recompensa)

);

INSERT INTO tarjeta VALUES (NULL, 7, NULL);
INSERT INTO usuario VALUES ( NULL,'11111111-1', 'Alexis Sanchez', 'Alexis@Sanchez.com', '123', 1);
INSERT INTO tienda VALUES  ( NULL,'76129263-3','Cafeterin Bombin', 'cafeterin@bombin.com', '123', 'Alameda #132','LOGO.jpg');
INSERT INTO recompensa VALUES ( NULL, 1, 'Cafézoide', 'Cafecito calientito gratis al conseguir tu recompensa','AA', 10, 1);
INSERT INTO recompensa VALUES ( null, 1 , 'Muffin Bombin', 'Muffin de chocolate bombin con gluten y grasas trans', 'AA', 12, 1)


DELIMITER //

CREATE PROCEDURE UsuarioConTarjeta(
    IN p_rut VARCHAR(50),
    IN p_nombre VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_password VARCHAR(50)
)
BEGIN
    DECLARE v_tarjeta_id INT;

	-- Insertar la tarjeta asociada al usuario
    INSERT INTO tarjeta (puntos, rfidtag) VALUES (0, null);
    SET v_tarjeta_id = LAST_INSERT_ID();
    
    -- Insertar el usuario
    INSERT INTO usuario (rut_usuario, nombre_usuario, email_usuario, password_usuario, id_tarjeta_fk) VALUES (p_rut, p_nombre, p_email, p_password, v_tarjeta_id);
    
END //

DELIMITER ;



