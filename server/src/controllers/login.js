const users = require("../utils/data");

const STATUS_OK = 200;
const STATUS_ERROR = 400;

const errors = {
    no_username: "No se recibió un nombre de usuario",
    no_password: "No se recibió una contraseña",
    no_access: "El usuario no existe"
};

let access = false;

let response = {
    access
};

const login = (req, res) =>{
    const {username, password} = req.query;

    if(!username) res.status(STATUS_ERROR).json({...response, error: errors.no_username});

    if(!password) res.status(STATUS_ERROR).json({...response, error: errors.no_password});

    users.forEach((user) => { if(user.username === username && user.password === password) access = true; });

    if(!access) res.status(STATUS_OK).json({...response, error: errors.no_access});

    res.status(STATUS_OK).json({...response, access});
}

module.exports = {
    login,
};