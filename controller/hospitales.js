const { response } = require('express');
const Hospital = require('./../models/hospital');

const getHospitales = async (req, res = response ) => {
    try {
        const hospitales = await Hospital.find()
                                        .populate('user img', 'nombre img');
        res.json({
            hospital: hospitales
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

const createHospitales = async (req, res = response ) => {
    const hospital = new Hospital({
        user: req.uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({
            hospital: hospitalDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }    
}

const updateHospitales = (req, res = response ) => {
    res.json({
        msg: 'Actualizar Hospitales'
    });
}

const deleteHospitales = (req, res = response ) => {
    res.json({
        msg: 'Borrar Hospitales'
    });
}

module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}