const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { secretJWT } = require("../config");


const validateJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg : 'No hay token'
        })
    }
    try {
        const { uid } = jwt.verify(token, secretJWT);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'token incorrecto'
        })
    }
}

module.exports = {
    validateJWT
}