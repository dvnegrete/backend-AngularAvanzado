const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req = request, res = response) => {
    const since = Number(req.query.since) || 0;    

    //traer todos los registros:
    //const users = await User.find()

    //traer solo algunos campos especificos:
    // const users = await User
    //     .find({}, 'nombre role email')

    const [users, count] = await Promise.all([
        User
            .find({}, 'nombre role email img')
            .skip( since )
            .limit( 5 ),

        User.count()        
    ]);
    //     .skip( since )
    //     .limit( 5 );
    // const count = await User.count();

    res.json({
        users,
        count
    });
}

const createUsers = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const findEmail = await User.findOne( {email});
        if (findEmail) {
            res.status(400).json({
                msg: 'Usuario ya registrado....'
            });
        }
        const user = new User( req.body );
        //Encriptacion de contraseña:
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        //const token = await generateJWT(userDB._id)
        const token = await generateJWT(user._id);
        await user.save();
        res.json({
            user, 
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error inesperado, revisar Logs'
        });
    }
}

const updateUsers = async (req, res = response) => {
    //falta validar el token antes
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if ( !userDB ) {
            return res.status(404).json({
                msg: 'Usuario no existe'
            });
        }
        const { password, google, email, ...valuesUpdate } = req.body;
        if(userDB.email !== email) {
            const trueEmail = await User.findOne({ email });
            if (trueEmail) {
                res.status(400).json({
                    msg: 'Ya existe usuario con ese email'
                });
            }
        }
        valuesUpdate.email = email;
        const userUpdate = await User.findByIdAndUpdate(uid, valuesUpdate);
        res.json({
            msg: 'Usuario Actualizado',
            userUpdate
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error inesperado'
        });
    }
}

const deleteUsers = async (req, res = response) => {
    try {
        const uid  = req.params.id;
        const userDB = await User.findById(uid);
        if ( !userDB ) {
            return res.status(404).json({
                msg: 'Usuario no existe'
            });
        }
        await User.findByIdAndDelete(uid);
        res.json({
            message: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsers,
    createUsers,
    updateUsers, 
    deleteUsers
}