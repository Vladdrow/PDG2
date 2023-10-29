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
        const apellidosArray = apellidos.trim().split(" ");
    
        if (apellidosArray.length === 1) {
            this.apellidoPaterno = apellidosArray[0];
            this.apellidoMaterno = "";
        } else if (apellidosArray.length >= 2) {
            this.apellidoPaterno = apellidosArray[0];
            this.apellidoMaterno = apellidosArray.slice(1).join(" ");
        }
    }

    setIsEditor(esEditor) {
        this.isEditor = esEditor ? true : false;
    }
}

export default User;