const { response } = require('express');
const Medico = require('./../models/medico');

const getMedicos = async (req, res = response ) => {
    try {
        const medico = await Medico.find()
                                .populate('hospital', 'nombre img')
                                .populate('user', 'nombre');
        res.json({
            msg: medico
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

const createMedicos = async (req, res = response ) => {
    const medico = new Medico({
        //El user es obligatorio. Su uid viene en el token de acceso. De ahi lo extraigo
        user: req.uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        res.json({
            medico: medicoDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

const updateMedicos = (req, res = response ) => {
    res.json({
        msg: 'Actualizar Medicos'
    });
}

const deleteMedicos = (req, res = response ) => {
    res.json({
        msg: 'Borrar Medicos'
    });
}

module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}