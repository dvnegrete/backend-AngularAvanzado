const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { use } = require('../routes/auth');

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
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado, pongase en contacto con el Administrador"
        });
    }
}

const googleSyncIn = async (req, res = response) => {
    try {
        const { email, name, picture} = await googleVerify(req.body.token)
        const userDB = await User.findOne({email});
        let user; 
        if (!userDB) {
            user = new User({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })            
        } else {
            user = userDB;
            user.google = true
        }
        await user.save();

        const token = await generateJWT(user._id);
        res.json({
            email,
            nombre: name,
            picture,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Token de Google incorrecto'
        })
    }
}

const renewToken = async (req = request, res = response)=> {
    const uid = req.uid;
    const token = await generateJWT(uid);
    res.json({
        token
    })
}

module.exports = {
    login,
    googleSyncIn,
    renewToken
}