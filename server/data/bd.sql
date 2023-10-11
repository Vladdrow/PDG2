-- Active: 1696876348843@@127.0.0.1@3306@pdg_revista

SHOW DATABASES;

CREATE DATABASE Guia_Empresarial_1;

DROP DATABASE Guia_Empresarial;

SHOW TABLES;

SHOW VARIABLES;

SELECT Host, User FROM mysql.user WHERE User = 'root';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

SELECT * FROM `Usuario`;

SELECT * FROM `Lector`;

SELECT * FROM `Llave_Lector`;

SELECT * FROM `Llave_Valida`;

USE Guia_Empresarial_1;

--  Tablas para el sitio web

CREATE TABLE
    Libro (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Titulo VARCHAR(255) NOT NULL,
        Descripcion TEXT NOT NULL,
        RutaImagen VARCHAR(255) NOT NULL,
        UrlLibro VARCHAR(255) NOT NULL
    );

-- 1. Usuario

CREATE TABLE
    Usuario (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        CorreoElectronico VARCHAR(255) UNIQUE,
        Contrasena VARCHAR(255),
        Salt VARCHAR(255) NULL,
        TipoUsuario ENUM('1', '2') DEFAULT '2', -- ('Editor', 'Lector') por defecto Lector
        IntentosFallidos INT DEFAULT 0,
        BloqueoTemporal DATETIME NULL DEFAULT NULL, -- Fecha y hora hasta la cual el usuario está bloqueado
        TokenRestablecimiento VARCHAR(255) NULL, -- Token para restablecer contraseña
        ExpiracionTokenRestablecimiento DATETIME NULL DEFAULT NULL, -- Fecha de caducidad del token de restablecimiento
        FechaRegistro DATETIME,
        FechaUltimoAcceso DATETIME NULL DEFAULT NULL,
        INDEX (CorreoElectronico)
    );

-- 2. Editor

CREATE TABLE
    Editor (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED UNIQUE,
        Nombre VARCHAR(100),
        ApellidoPaterno VARCHAR(100),
        ApellidoMaterno VARCHAR(100),
        RutaImagen VARCHAR(255) NULL,
        Rol VARCHAR(100) NOT NULL,
        Descripcion TEXT NULL,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 3. Lector

CREATE TABLE
    Lector (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED UNIQUE,
        Nombre VARCHAR(100),
        ApellidoPaterno VARCHAR(100),
        ApellidoMaterno VARCHAR(100),
        RutaImagen VARCHAR(255) NULL,
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 4. Seccion

CREATE TABLE
    Seccion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(100),
        Descripcion TEXT,
        RutaImagen VARCHAR(255)
    );

-- 5. Empresa

CREATE TABLE
    Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(150),
        EditorID INT UNSIGNED,
        SeccionID INT UNSIGNED,
        UrlSitioWeb VARCHAR(255),
        Direccion VARCHAR(255),
        Ubicacion VARCHAR(255),
        FechaInicio DATE,
        FechaFin DATE,
        FOREIGN KEY (EditorID) REFERENCES Editor(ID),
        FOREIGN KEY (SeccionID) REFERENCES Seccion(ID)
    );

-- 6. Producto_Servicio_Empresa

CREATE TABLE
    Producto_Servicio_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        Descripcion TEXT,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 7. Red_Social_Empresa

CREATE TABLE
    Red_Social_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoRedSocial ENUM('1', '2', '3', '4'),
        /* ENUM('Facebook', 'Twitter', 'Instagram', 'LinkedIn') */
        UrlRedSocial VARCHAR(255),
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 8. Contacto_Empresa

CREATE TABLE
    Contacto_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoContacto ENUM('1', '2', '3'),
        /* ENUM('1', '2', '3') */
        Prefijo VARCHAR(10),
        DetalleContacto VARCHAR(255),
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 9. Direccion

CREATE TABLE
    Direccion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Calle VARCHAR(255),
        Numero INT,
        Ciudad VARCHAR(100),
        Estado VARCHAR(100),
        Pais VARCHAR(100),
        InformacionAdicional TEXT
    );

-- 10. Direccion_Empresa

CREATE TABLE
    Direccion_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        DireccionID INT UNSIGNED,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID),
        FOREIGN KEY (DireccionID) REFERENCES Direccion(ID)
    );

-- 11. Horario_De_Atencion

CREATE TABLE
    Horario_De_Atencion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        DiaSemana ENUM('1', '2', '3', '4', '5', '6', '7'),
        /* ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') */
        HoraApertura TIME,
        HoraCierre TIME,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 12. Actividad_Empresa

CREATE TABLE
    Actividad_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        DetalleActividad TEXT,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 13. Descripcion_Empresa

CREATE TABLE
    Descripcion_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TextoDescripcion TEXT,
        Historia TEXT,
        Mision TEXT,
        Vision TEXT,
        InformacionAdicional TEXT,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 14. Membresia_Empresa

CREATE TABLE
    Membresia_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoMembresia ENUM('1', '2', '3'),
        /* ENUM('Basica', 'Premium', 'Gold') por defecto Básica*/
        FechaInicio DATE,
        FechaFin DATE,
        EstadoPago ENUM('1', '2', '3'),
        /* ENUM('Pagado', 'Pendiente', 'Vencido') por defecto Pendiente*/
        MetodoPago ENUM('1', '2', '3'),
        /* ENUM('Tarjeta', 'PayPal', 'Transferencia') */
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 15. Historial_Cambio_Empresa

CREATE TABLE
    Historial_Cambio_Empresa (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EditorID INT UNSIGNED,
        EmpresaID INT UNSIGNED,
        Operacion ENUM('1', '2', '3'),
        /* ENUM('INSERT', 'UPDATE', 'DELETE') */
        NombreAtributo VARCHAR(100),
        ValorAnterior VARCHAR(255),
        ValorAtributo VARCHAR(255),
        FechaCambio DATE,
        FOREIGN KEY (EditorID) REFERENCES Editor(ID),
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 16. Notificacion

CREATE TABLE
    Notificacion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EditorID INT UNSIGNED,
        Titulo VARCHAR(255),
        Contenido TEXT,
        Tipo ENUM('1', '2'),
        /* ENUM('Automatica', 'Manual') */
        Prioridad ENUM('1', '2', '3'),
        /* ENUM('Alta', 'Media', 'Baja') por defecto Baja*/
        Enlace VARCHAR(255),
        FechaCreacion DATE,
        FechaEnvio DATE,
        Estado ENUM('0', '1', '2', '3'),
        /* ENUM('Borradores','Enviada', 'Leida', 'Programada')*/
        FOREIGN KEY (EditorID) REFERENCES Editor(ID)
    );

-- 17. Lector_Notificacion

CREATE TABLE
    Lector_Notificacion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LectorID INT UNSIGNED,
        NotificacionID INT UNSIGNED,
        Leido BOOLEAN DEFAULT FALSE,
        FechaLectura DATE,
        FOREIGN KEY (LectorID) REFERENCES Lector(ID),
        FOREIGN KEY (NotificacionID) REFERENCES Notificacion(ID)
    );

-- 18. Suscripcion

CREATE TABLE
    Suscripcion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LectorID INT UNSIGNED,
        SeccionID INT UNSIGNED,
        Estado ENUM('0', '1'),
        /* Estado ENUM('Inactivo', 'Activo') */
        FechaSuscrito DATE,
        FOREIGN KEY (LectorID) REFERENCES Lector(ID),
        FOREIGN KEY (SeccionID) REFERENCES Seccion(ID)
    );

-- 19. Llave_Valida

CREATE TABLE
    Llave_Valida (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LlaveEncriptada VARCHAR(255),
        FirmaLlave VARCHAR(255),
        EstadoLlave ENUM('1', '0', '-1'),
        /* ENUM('Activo', 'Inactivo', 'Expirado')  */
        FechaCreacion DATETIME,
        INDEX (EstadoLlave)
    );

-- 20. Llave_Lector

CREATE TABLE
    Llave_Lector (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LectorID INT UNSIGNED,
        LlaveEncriptada VARCHAR(255),
        FirmaLlave VARCHAR(255),
        Estado ENUM('1', '0', '-1'),
        /* ENUM('Activo', 'Inactivo', 'Expirado')  */
        FechaCreacion DATETIME,
        FOREIGN KEY (LectorID) REFERENCES Lector(ID)
    );

-- 21. Pago_Lector

CREATE TABLE
    Pago_Lector (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LectorID INT UNSIGNED,
        Monto DECIMAL(10, 2),
        MetodoPago ENUM('1', '2'),
        /* ENUM('Transferencia', 'Efectivo') */
        Estado ENUM('1', '2', '0'),
        /* ENUM('Confirmado', 'Pendiente', 'Anulado') por defecto pendiente*/
        Nota TEXT,
        FOREIGN KEY (LectorID) REFERENCES Lector(ID)
    );

-- 22. Archivo_Adjunto

CREATE TABLE
    Archivo_Adjunto (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        EmpresaID INT UNSIGNED,
        TipoArchivo ENUM('1', '2', '3', '4', '5'),
        /* ENUM('Imagen', 'Documento', 'Video', 'Audio', 'PDF') */
        NombreArchivo VARCHAR(255),
        RutaArchivo VARCHAR(255),
        FechaSubida DATE,
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );

-- 23. Historial_Busqueda

CREATE TABLE
    Historial_Busqueda (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LectorID INT UNSIGNED,
        TerminoBusqueda VARCHAR(255),
        FechaBusqueda DATE,
        FOREIGN KEY (LectorID) REFERENCES Lector(ID)
    );

-- 24. Registro_Inicio_Sesion

CREATE TABLE
    Registro_Inicio_Sesion (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        UsuarioID INT UNSIGNED,
        TipoUsuario ENUM('1', '2'),
        /* ENUM('Editor', 'Lector') */
        FechaHora DATETIME DEFAULT CURRENT_TIMESTAMP,
        IP VARCHAR(50),
        FOREIGN KEY (UsuarioID) REFERENCES Usuario(ID)
    );

-- 25. Lector_Favorito

CREATE TABLE
    Lector_Favorito (
        ID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        LectorID INT UNSIGNED,
        EmpresaID INT UNSIGNED,
        Estado ENUM('0', '1'),
        /* ENUM('Inactivo', 'Activo') */
        Fecha DATE,
        FOREIGN KEY (LectorID) REFERENCES Lector(ID),
        FOREIGN KEY (EmpresaID) REFERENCES Empresa(ID)
    );