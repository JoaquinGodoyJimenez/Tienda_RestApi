CREATE DATABASE tienda;

--Tabla usuario

CREATE TABLE usuario(
    id_usuario SERIAL PRIMARY KEY,
    correo TEXT NOT NULL,
    contrasena VARCHAR(32) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(12) NOT NULL,
    token VARCHAR(64)
);

ALTER TABLE usuario
    ADD CONSTRAINT check_correo
    CHECK (correo ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE usuario
    ADD CONSTRAINT unique_correo
    UNIQUE (correo);

ALTER TABLE usuario
ADD CONSTRAINT telefono_check
CHECK (telefono ~ '^[0-9]{10}$');

--Tabla categoria

CREATE TABLE categoria(
    id_categoria SERIAL PRIMARY KEY,
    categoria VARCHAR(50) UNIQUE NOT NULL
);

--Tabla proveedor

CREATE TABLE proveedor(
    id_proveedor SERIAL PRIMARY KEY,
    proveedor VARCHAR(50) UNIQUE NOT NULL,
    telefono VARCHAR(12) NOT NULL 
);

ALTER TABLE proveedor
ADD CONSTRAINT telefono_check
CHECK (telefono ~ '^[0-9]{10}$');

--Tabla rol
CREATE TABLE rol(
    id_rol SERIAL PRIMARY KEY,
    rol VARCHAR(50) UNIQUE NOT NULL
);

--Tabla tienda
CREATE TABLE tienda(
    id_tienda SERIAL PRIMARY KEY,
    tienda VARCHAR(50) UNIQUE NOT NULL,
    direccion TEXT NOT NULL
);

--Tabla empleado
CREATE TABLE empleado(
    id_empleado SERIAL PRIMARY KEY,
    empleado VARCHAR(50) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(12) NOT NULL,
    id_tienda INT NOT NULL
);

ALTER TABLE empleado
ADD CONSTRAINT telefono_check
CHECK (telefono ~ '^[0-9]{10}$');

ALTER TABLE empleado
ADD FOREIGN KEY (id_tienda) 
REFERENCES tienda(id_tienda);

--Tabla marca
CREATE TABLE marca(
    id_marca SERIAL PRIMARY KEY,
    marca VARCHAR(50) UNIQUE NOT NULL,
    id_proveedor INT NOT NULL
);

ALTER TABLE marca
ADD FOREIGN KEY (id_proveedor) 
REFERENCES proveedor(id_proveedor);

--Tabla marca_categoria
CREATE TABLE marca_categoria(
    id_marca INT NOT NULL,
    id_categoria INT NOT NULL,
    PRIMARY KEY (id_marca, id_categoria)
);

ALTER TABLE marca_categoria
ADD FOREIGN KEY (id_marca) 
REFERENCES marca(id_marca);

ALTER TABLE marca_categoria
ADD FOREIGN KEY (id_categoria) 
REFERENCES categoria(id_categoria);

--Tabla venta
CREATE TABLE venta(
    id_venta SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    id_usuario INT NOT NULL,
    id_tienda INT NOT NULL,
    id_empleado INT NOT NULL
);

ALTER TABLE venta
ADD FOREIGN KEY (id_usuario) 
REFERENCES usuario(id_usuario);

ALTER TABLE venta
ADD FOREIGN KEY (id_tienda) 
REFERENCES tienda(id_tienda);

ALTER TABLE venta
ADD FOREIGN KEY (id_empleado) 
REFERENCES empleado(id_empleado);

--Tabla pago
CREATE TABLE pago(
    id_pago SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    monto NUMERIC(10,2) NOT NULL,
    id_venta INT NOT NULL
);

ALTER TABLE pago
ADD FOREIGN KEY (id_venta) 
REFERENCES venta(id_venta);

--Tabla producto
CREATE TABLE producto(
    id_producto SERIAL PRIMARY KEY,
    producto VARCHAR(50) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    costo NUMERIC(10,2) NOT NULL,
    sku VARCHAR(50) NOT NULL,
    unidades INT NOT NULL,
    id_marca INT NOT NULL,
    id_categoria INT NOT NULL
);

ALTER TABLE producto
ADD FOREIGN KEY (id_marca) 
REFERENCES marca(id_marca);

ALTER TABLE producto
ADD FOREIGN KEY (id_categoria) 
REFERENCES categoria(id_categoria);

--Tabla venta_detalle
CREATE TABLE venta_detalle(
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_venta, id_producto)
);

ALTER TABLE venta_detalle
ADD FOREIGN KEY (id_venta) 
REFERENCES venta(id_venta);

ALTER TABLE venta_detalle
ADD FOREIGN KEY (id_producto) 
REFERENCES producto(id_producto);

--Tabla privilegio
CREATE TABLE privilegio(
    id_privilegio SERIAL PRIMARY KEY,
    privilegio VARCHAR(50) NOT NULL
);

--Tabla usuario_rol
CREATE TABLE usuario_rol(
    id_usuario INT NOT NULL,
    id_rol INT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol)
);

ALTER TABLE usuario_rol
ADD FOREIGN KEY (id_usuario) 
REFERENCES usuario(id_usuario);

ALTER TABLE usuario_rol
ADD FOREIGN KEY (id_rol) 
REFERENCES rol(id_rol);

--Tabla rol_privilegio
CREATE TABLE rol_privilegio(
    id_rol INT NOT NULL,
    id_privilegio INT NOT NULL,
    PRIMARY KEY (id_rol, id_privilegio)
);

ALTER TABLE rol_privilegio
ADD FOREIGN KEY (id_rol) 
REFERENCES rol(id_rol);

ALTER TABLE rol_privilegio
ADD FOREIGN KEY (id_privilegio) 
REFERENCES privilegio(id_privilegio);