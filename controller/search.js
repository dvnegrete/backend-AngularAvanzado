const { request, response } = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getSearchAll = async (req = request, res = response) => {
    try {
        const elementSearch = req.params.find;
        const regex = new RegExp(elementSearch, 'i');
        const [ users, hospitales, medicos] = await Promise.all([
            User.find({ nombre: regex}),
            Hospital.find({ nombre: regex}),
            Medico.find({ nombre: regex})
        ]);
        res.json({
            usuarios: users,
            hospitales,
            medicos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado, pongase en contacto con el Administrador"
        });
    }
}

const getCollection = async (req = request, res = response) => {
    try {
        const elementSearch = req.params.find;
        const regex = new RegExp(elementSearch, 'i');
        const table = req.params.table;
        let search = [];
        switch (table) {
            case 'medicos':
                search = await Medico
                    .find({ nombre: regex})
                    .populate('hospital', 'nombre img');
                break;
            case 'hospitales': 
                search = await Hospital.find({ nombre: regex});
                break;
            case 'usuarios':                
                search = await User.find({ nombre: regex});
                break;
            default:
                res.status(400).json({
                    msg: 'Solo puede ser medicos/hospitales/usuarios para el tipo de coleccion'
                });
                break;
        }
        res.json({
            resultados: search
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado, pongase en contacto con el Administrador"
        });
    }
}

module.exports = {
    getSearchAll,
    getCollection
}