const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({email});
        if (!userDB) {
            return res.status(400).json({
                msg: 'Password o email no validos!'
            });
        }
        const validatePassword = bcrypt.compareSync(password, userDB.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Password o email no validos!!!'
            });
        }
        //Generar el Token
        const token = await generateJWT(userDB._id);
        res.json({
            msg: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado, pongase en contacto con el Administrador"
        });
    }
}

module.exports = {
    login
}