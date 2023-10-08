class User {
    constructor(id, email) {
        this.id = id;
        this.email = email;
        this.nombre = "";
        this.apellidoPaterno = "";
        this.apellidoMaterno = "";
        this.isEditor = false;
    }

    setNombreCompleto(nombre, apellidos) {
        this.nombre = nombre.trim();
        [this.apellidoPaterno, this.apellidoMaterno] = apellidos.trim().split(" ");
    }

    setIsEditor(esEditor) {
        this.isEditor = esEditor ? true : false;
    }
}

export default User;