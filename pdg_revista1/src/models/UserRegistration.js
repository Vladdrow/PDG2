import User from './User.js';

class UserRegistration extends User {
    constructor(email, password, confirmPassword) {
        super(null, email);
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    setPasswords(password, confirmPassword) {
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    passwordsMatch() {
        return this.password === this.confirmPassword;
    }

    isPasswordValid() {
        if (this.password.length < 8) {
            return false;
        }
        if (!/[a-z]/.test(this.password) || !/[A-Z]/.test(this.password)) {
            return false;
        }
        if (!/\d/.test(this.password)) {
            return false;
        }
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(this.password)) {
            return false;
        }
        return true;
    }
}

export default UserRegistration;
