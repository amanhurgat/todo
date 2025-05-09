const { login, register, logout } = require('../Controllers/user.controller');

module.exports = (app) => {
    app.post('/login', login);
    app.post('/register', register);
    app.post('/logout',logout);
    
}