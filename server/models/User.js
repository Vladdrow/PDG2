import bcrypt from 'bcrypt';

class User {
    constructor(id, email, password, confirmPassword) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
/*         this.passwordResetToken = null;
        this.passwordResetTokenExpiry = null; */
        this.nombre = "";
        this.apellidoPaterno = "";
        this.apellidoMaterno = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isEditor = false;  // Campo para determinar si es editor
        this.occupation = null;
    }

    setNombreCompleto(nombre, apellidos) {
        this.nombre = nombre.trim();
        [this.apellidoPaterno, this.apellidoMaterno] = apellidos.trim().split(" ");
    }

    setIsEditor(esEditor) {
        this.isEditor = esEditor ? true : false;
    }

    passwordsMatch() {
        return this.password === this.confirmPassword;
    }

    isPasswordValid() {
        // La contraseña debe tener al menos 8 caracteres.
        if (this.password.length < 8) {
            return false;
        }

        // Debe contener al menos una letra mayúscula y una minúscula.
        if (!/[a-z]/.test(this.password) || !/[A-Z]/.test(this.password)) {
            return false;
        }

        // Debe incluir al menos un número.
        if (!/\d/.test(this.password)) {
            return false;
        }

        // Puede contener caracteres especiales como !, @, #, $, etc.
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(this.password)) {
            return false;
        }

        return true; // La contraseña cumple con todas las reglas
    }

    async setHashedPassword(rawPassword) {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(rawPassword, salt);
    }
    
    async checkHashedPassword(rawPassword) {
        return await bcrypt.compare(rawPassword, this.password);
    }
    
    /* changePassword(currentPassword, newPassword) {
        if (
            this.checkPassword(currentPassword) &&
            this.isPasswordValid(newPassword)
        ) {
            this.password = newPassword;
            return true; // Contraseña cambiada exitosamente
        }
        return false; // No se pudo cambiar la contraseña
    } */

    /* resetPassword(newPassword) {
        if (this.isPasswordValid(newPassword)) {
            this.password = newPassword;
            this.passwordResetToken = null;
            this.passwordResetTokenExpiry = null;
            return true; // Contraseña restablecida exitosamente
        }
        return false; // No se pudo restablecer la contraseña
    } */

    checkPassword(password) {
        return this.password === password;
    }
}
export default User;