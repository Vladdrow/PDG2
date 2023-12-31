import User from './User.js';

class UserFrontend extends User {
    constructor(id, email) {
        super(id, email);
        this.isPremium = false;
        this.fechaUltimoAcceso = "";
        this.fechaRegistro = "";
    }

    setIsPremium(isPremium) {
        this.isPremium = isPremium ? true : false;
    }
}

export default UserFrontend;