USE db_acornify;

CREATE TABLE usuario(

    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario varchar(60) not null,
    email_usuario varchar(60) not null,
    password_usuario varchar(60) not null

);

CREATE TABLE tienda(

    id_tienda INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tienda VARCHAR(60) NOT NULL,
    email_tienda VARCHAR(60)NOT NULL,
    password_tienda VARCHAR(60) NOT NULL,
    ubicacion VARCHAR(200) NOT NULL

);


CREATE TABLE recompensa(

    id_recompensa INT AUTO_INCREMENT PRIMARY KEY,
    id_tienda_fk INT NOT NULL,
    producto VARCHAR(60) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    meta INT NOT NULL,
    FOREIGN KEY (id_tienda_fk) REFERENCES tienda(id_tienda)

);


CREATE TABLE suscripciones(

    id_suscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_recompensa_fk INT NOT NULL,
    id_usuario_fk INT NOT NULL,
    estado VARCHAR(60) NOT NULL,
    FOREIGN KEY(id_recompensa_fk) REFERENCES recompensa(id_recompensa),
    FOREIGN KEY(id_usuario_fk) REFERENCES usuario(id_usuario)
)

INSERT INTO usuario VALUES ( NULL, 'Alexis Sanchez', 'Alexis@Sanchez.com', 'omcarrito');
INSERT INTO tienda VALUES  ( NULL,'Cafeterin Bombin', 'cafeterin@bombin.com', 'cafeterinbombin123', 'Fadrex City, Calle Fortaleza #132');
INSERT INTO recompensa VALUES ( NULL, 1, 'Café de metales a elección', 'Cafecito calientito gratis al conseguir tu recompensa', 12)
INSERT INTO suscripciones VALUES ( NULL, 1,1, 'en curso');