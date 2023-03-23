const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { secretJWT } = require("../config");
const Usuario = require('./../models/user');


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

const validateAdminRole = async (req = request, res = response, next)=> {
    try {
        const uid = req.uid;
        const userDB = await Usuario.findById(uid);
        if (!userDB) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }
        if (userDB !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'Sin privilegios'
            })
        }

        next();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Solo Administradores pueden ver el error'
        })
    }
    
}

const validateAdminRoleOrSameUser = async (req = request, res = response, next)=> {
    const uid = req.uid;
    const id = req.params.id
    try {
        const userDB = await Usuario.findById(uid);
        if (!userDB) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }
        if (userDB === 'ADMIN_ROLE' || uid === id ) {
            next();
        } else {
            return res.status(403).json({
                msg: 'Sin privilegios'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Solo Administradores pueden ver el error'
        })
    }
    
}

module.exports = {
    validateJWT, 
    validateAdminRole,
    validateAdminRoleOrSameUser
}