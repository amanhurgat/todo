const { login, register, logout } = require('../Controllers/user.controller');
const { verifyToken } = require('../Middleware/user.middleware');

module.exports = (app) => {
    app.post('/login', login);
    app.post('/register', register);
    app.post('/logout',[verifyToken],logout);
    
}